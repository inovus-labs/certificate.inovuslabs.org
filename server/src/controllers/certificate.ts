
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { ethers } from 'ethers';
import { Request, Response } from 'express';

import { Certificate, RevokedCertificate } from '../models';
import CertificateValidator from '../abi/CertificateValidator.json';


const etherscanApiUrl = "https://api-sepolia.etherscan.io"

const contractAddress = process.env.CONTRACT_ADDRESS;
const rpcUrl = process.env.ALCHEMY_SEPOLIA_RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;


if (!contractAddress || !rpcUrl || !privateKey || !etherscanApiKey) {
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

    const certificate = await Certificate.find({ 'metadata.certificate_id': id }).select('metadata hash txHash -_id');
    if (!certificate || certificate.length === 0) {
      return res.status(204).json({ message: 'No certificates found' });
    }
    return res.status(200).json(certificate[0]);

  } catch (err: any) {
    console.error("Error fetching certificate: ", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Get Transaction by Hash
export const getTransactionByHash = async (req: Request, res: Response) => {
  const { txHash } = req.params;
  try {
    const etherscanUrl = `${etherscanApiUrl}/api?chainid=1&module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${etherscanApiKey}`;

    const response = await axios.get(etherscanUrl);
    const transaction = response.data.result;
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    const { blockHash, blockNumber, from, to, gas } = transaction;
    const transactionDetails = {
      blockHash,
      blockNumber,
      from,
      to,
      // gas,
      // status: transaction.isError === '0' ? 'Success' : 'Failed',
    };
    return res.status(200).json({
      message: 'Transaction details fetched successfully',
      data: {
        ...transactionDetails,
        network: 'Sepolia Testnet',
        explorerUrl: `https://sepolia.etherscan.io/tx/${txHash}`,
      }
    });
    
  } catch (err: any) {
    console.error("Error fetching transaction: ", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}



// Search certificates by recipient name or Certificate ID
export const searchCertificates = async (req: Request, res: Response) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }
  try {
    const regex = new RegExp(query.toString(), 'i');
    const certificates = await Certificate.find({
      $or: [
        { 'metadata.recipient_name': regex },
        { 'metadata.certificate_id': regex }
      ]
    }).select('metadata -_id');

    if (!certificates || certificates.length === 0) {
      return res.status(204).json({ message: 'No certificates found' });
    }

    const result = certificates.map((c: any) => c.metadata);
    return res.status(200).json(result);

    // const result = certificates.map((c: any) => c.metadata);
    // let output = result;
    // if (result.length === 1) {
    //   output = Array(10).fill(result[0]);
    // }

    // return res.status(200).json(output);

  } catch (err: any) {
    console.error("Error searching certificates: ", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}