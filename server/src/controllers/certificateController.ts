
import dotenv from 'dotenv';
dotenv.config();

import crypto from 'crypto';
import { ethers } from 'ethers';
import { Request, Response } from 'express';

import Certificate from '../models/Certificate';

const contractAddress = process.env.CONTRACT_ADDRESS || '';
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || '');

const abi = [
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "name": "hashes",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "hash",
              "type": "string"
          }
      ],
      "name": "storeHash",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "hash",
              "type": "string"
          }
      ],
      "name": "verifyHash",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
];
const signer = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider);
const contract = new ethers.Contract(contractAddress, abi, signer);



export const addCertificate = async (req: Request, res: Response) => {
  const metadata = req.body;
  const hash = crypto.createHash('sha256').update(JSON.stringify(metadata)).digest('hex');

  try {
    const tx = await contract.storeHash(hash);
    await tx.wait();

    const explorerUrl = `https://sepolia.etherscan.io/tx/${tx.hash}`;
    await Certificate.create({
      metadata,
      hash,
      txHash: tx.hash,
      network: 'Polygon Mumbai',
      chainId: 80001,
      contractAddress,
      explorerUrl
    });

    res.json({ success: true, hash, txHash: tx.hash });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const verifyCertificate = async (req: Request, res: Response) => {
  const { hash } = req.params;

  try {
    const isValid = await contract.verifyHash(hash);
    const record = await Certificate.findOne({ hash });

    if (!isValid || !record) return res.status(404).json({ valid: false });

    res.json({ valid: true, metadata: record.metadata, explorerUrl: record.explorerUrl });
  } catch (err: any) {
    res.status(500).json({ valid: false, error: err.message });
  }
};
