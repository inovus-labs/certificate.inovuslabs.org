
import dotenv from 'dotenv';
dotenv.config();

import { ethers } from 'ethers';
import { Request, Response } from 'express';

import { Certificate, RevokedCertificate } from '../models';
import CertificateValidator from '../abi/CertificateValidator.json';



const contractAddress = process.env.CONTRACT_ADDRESS;
const rpcUrl = process.env.ALCHEMY_SEPOLIA_RPC_URL;
const privateKey = process.env.PRIVATE_KEY;

if (!contractAddress || !rpcUrl || !privateKey) {
  throw new Error('Missing CONTRACT_ADDRESS, ALCHEMY_SEPOLIA_RPC_URL, or PRIVATE_KEY in environment variables');
}

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, CertificateValidator.abi, signer);



// Add a certificate to the blockchain
export const addCertificate = async (req: Request, res: Response) => {
  
  let metadata = req.body;
  metadata = {
    ...metadata,
    issuer: "Amith Abey Stephen",
    entity: "Inovus Labs IEDC",
  }

  const fields = [
    "certificate_id",
    "recipient_name",
    "event_name",
    "event_type",
    "event_date",
    "issue_date",
    "issuer",
    "entity",
  ];

  const sanitize = (value: string) => String(value).replace(/\s+/g, '_');

  const dataString = fields.map((key) => sanitize(metadata[key])).join(' | ');
  console.log("\nData String: ", dataString);
  
  const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(dataString));
  console.log("Hash: ", hash);
  

  try {
    const tx = await contract.storeHash(hash);
    await tx.wait();

    console.log("Transaction Hash: ", tx.hash, "\n");

    const explorerUrl = `https://sepolia.etherscan.io/tx/${tx.hash}`;
    await Certificate.create({
      metadata,
      hash,
      txHash: tx.hash,
      // network: 'Polygon Mumbai',
      // chainId: 80001,
      // contractAddress,
      // explorerUrl
    });

    return res.status(200).json({
      hash,
      txHash: tx.hash,
      explorerUrl,
    });

  } catch (err: any) {
    console.error("Error adding certificate: ", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Verify a certificate on the blockchain
export const verifyCertificate = async (req: Request, res: Response) => {
  const { hash } = req.params;

  try {
    const isValid = await contract.verifyHash(hash);
    const record = await Certificate.findOne({ hash });

    if (!isValid || !record) return res.status(404).json({ valid: false });

    return res.status(200).json({
      valid: true,
      hash,
      txHash: record.txHash,
      explorerUrl: `https://sepolia.etherscan.io/tx/${record.txHash}`,
      metadata: record.metadata,
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

    const certificate = await Certificate.find({ 'metadata.certificate_id': id }).select('metadata hash txHash -_id');
    if (!certificate || certificate.length === 0) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    return res.status(200).json(certificate[0]);

  } catch (err: any) {
    console.error("Error fetching certificate: ", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};