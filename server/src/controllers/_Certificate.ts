
import axios from 'axios';
import { ethers } from 'ethers';
import { Request, Response } from 'express';

import { saveAuditLog } from './AuditLog';
import { contract } from '../../config/contract';
import { getOrCreateUser } from './User';
import { Certificate, RevokedCertificate, AuditLog, User } from '../models';
import { DEFAULT_NETWORK } from '../../config/network';



interface RequestWithUser extends Request {
  user?: {
    id: string;
    name?: string;
    role?: string;
  }
}

// Add a certificate to the blockchain
export const addCertificate = async (req: RequestWithUser, res: Response) => {
  let {
    certificate_id,
    recipient_name,
    email,
    mobile,
    event_id,
    url,
    issue_date
  } = req.body;

  let issued_by = req.user?.id;

  // Validate the request body
  const requiredFields = ['certificate_id', 'recipient_name', 'email', 'mobile', 'event_id', 'url', 'issue_date'];
  
  for (const field of requiredFields) {
    if (!req.body[field] || typeof req.body[field] !== 'string' || !req.body[field].trim()) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }


  // Check if the user exists, if not create a new user
  let user = await getOrCreateUser({
    name: recipient_name,
    email,
    mobile
  });

  
  // Prepare hash
  let fields = ['certificate_id', 'recipient_name', 'event_id', 'issue_date', 'issued_by'];

  const sanitize = (value: string | undefined) => String(value ?? '').replace(/\s+/g, '_').trim();
  const fieldValues: Record<string, string | undefined> = {
    certificate_id,
    recipient_name,
    event_id,
    issue_date,
    issued_by,
  };

  const dataString = fields.map((key) => sanitize(fieldValues[key])).join(' | ');

  const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(dataString));

  console.log("Certificate ID:", certificate_id);
  console.log("Data String:", dataString);
  console.log("Hash:", hash);

  
  // Check for duplicate certificate
  const existingCertificate = await Certificate.findOne({ certificate_id });
  if (existingCertificate) {
    return res.status(400).json({ error: 'Certificate with this ID already exists' });
  }


  try {
    const tx = await contract.storeHash(hash);
    await tx.wait();

    console.log("Transaction Hash: ", tx.hash, "\n");

    await Certificate.create({
      certificate_id,
      user_id: (user as { id: string }).id,
      // metadata,
      hash,
      txHash: tx.hash,
      event_id,
      url,
      issued_at: new Date(issue_date),
      issued_by,
    });

    // Save audit log
    await saveAuditLog({
      action: 'ADD_CERTIFICATE',
      user_id: (user as { id: string }).id,
      txHash: tx.hash,
      description: `Certificate added with ID: ${certificate_id}`
    });

    return res.status(200).json({
      hash,
      txHash: tx.hash,
      explorerUrl: `${DEFAULT_NETWORK.blockExplorerUrl}/tx/${tx.hash}`,
    });

  } catch (err: any) {
    console.error("Error adding certificate: ", err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Verify a certificate on the blockchain
export const verifyCertificate = async (req: Request, res: Response) => {
  const { hash } = req.params;

  try {
    const isValid = await contract.verifyHash(hash);

    if (!isValid) {
      return res.status(404).json({
        message: 'Certificate does not exist on Blockchain',
        valid: false
      });
    }

    return res.status(200).json({
      message: 'Certificate exists on Blockchain',
      valid: true
    });
  } catch (err: any) {
    console.error("Error verifying certificate: ", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Get certificate by ID
export const getCertificateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const certificates = await Certificate.aggregate([
      { $match: { certificate_id: id } },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: 'id',
          as: 'user'
        }
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          metadata: {
            recipient_name: '$user.name',
            certificate_id: '$certificate_id',
            issue_date: '$issued_at',
            event_name: '$event_id',
            issued_by: 'Inovus Labs IEDC'
          },
          url: '$url',
          hash: '$hash',
          txHash: '$txHash',
        }
      }
    ]);

    if (!certificates || certificates.length === 0) {
      return res.status(204).json({ message: 'No certificates found' });
    }
    return res.status(200).json(certificates[0]);
  } catch (err: any) {
    console.error("Error fetching certificate: ", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Search certificates by ID or recipient name
export const searchCertificates = async (req: Request, res: Response) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }
  try {
    const regex = new RegExp(query.toString(), 'i');
    const certificates = await Certificate.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: 'id',
          as: 'user'
        }
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $match: {
          $or: [
            { certificate_id: regex },
            { 'user.name': regex }
          ]
        }
      },
      {
        $project: {
          certificate_id: 1,
          'user.name': 1,
          event_id: 1,
          issued_at: 1,
          _id: 0
        }
      }
    ]);    

    if (!certificates || certificates.length === 0) {
      return res.status(204).json({ message: 'No certificates found' });
    }

    const result = certificates.map(cert => ({
      certificate_id: cert.certificate_id,
      recipient_name: cert.user ? cert.user.name : 'Unknown',
      event_name: cert.event_name || cert.event_id,
      issue_date: cert.issued_at,
    }));

    return res.status(200).json(result);

  } catch (err: any) {
    console.error("Error searching certificates: ", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Revoke a certificate
export const revokeCertificate = async (req: Request, res: Response) => {
  
  const revoked_by = (req as any).user?.id;
  
  const { certificate_id, reason } = req.body;  
  const requiredFields = ['certificate_id', 'reason'];

  for (const field of requiredFields) {
    if (!req.body[field] || typeof req.body[field] !== 'string' || !req.body[field].trim()) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }
  
  
  const certificate = await Certificate.findOne({ certificate_id, status: true });
  if (!certificate) {
    return res.status(404).json({ error: 'Certificate not found or already revoked' });
  }

  const hash = certificate.hash;

  try {
    const tx = await contract.revokeHash(hash);
    await tx.wait();

    // Add to RevokedCertificate table
    await RevokedCertificate.create({
      certificate_id,
      revoked_by,
      reason,
    });

    // Update status in Certificate table
    await Certificate.updateOne(
      { certificate_id },
      { $set: { status: false } }
    );

    // Save audit log
    await saveAuditLog({
      action: 'REVOKE_CERTIFICATE',
      user_id: certificate.user_id,
      txHash: tx.hash,
      description: `Revoked certificate with ID: ${certificate_id}`
    });

    console.log("Transaction Hash: ", tx.hash, "\n");

    return res.status(200).json({
      message: 'Certificate revoked successfully',
      hash,
      txHash: tx.hash,
      explorerUrl: `${DEFAULT_NETWORK.blockExplorerUrl}/tx/${tx.hash}`,
    });

  } catch (err: any) {
    console.error("Error revoking certificate: ", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
