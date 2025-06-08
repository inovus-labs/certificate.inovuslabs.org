
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';
import { DEFAULT_NETWORK } from './network';


const rpcUrl = DEFAULT_NETWORK.rpcUrl;
const privateKey = process.env.PRIVATE_KEY;

if (!rpcUrl || !privateKey) {
  throw new Error('RPC URL or Private Key environment variable is not set');
}


const contractAddress = process.env.CONTRACT_ADDRESS;
const contractName = process.env.CONTRACT_NAME;

if (!contractAddress || !contractName) {
  throw new Error('CONTRACT_ADDRESS or CONTRACT_NAME environment variable is not set');
}


const artifactPath = path.join(__dirname, `../artifacts/contracts/${contractName}.sol/${contractName}.json`);
const contractAbi = JSON.parse(fs.readFileSync(artifactPath, 'utf8')).abi;

if (!contractAbi) {
  throw new Error('Contract ABI could not be read from the artifact file. Run compile script first.');
}


const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractAbi, signer);

export { provider, signer, contract, contractAddress, contractAbi };
