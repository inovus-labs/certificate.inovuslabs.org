
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import { ethers } from "hardhat";


if (!process.env.CONTRACT_NAME) {
	throw new Error('CONTRACT_NAME environment variable is not set');
}


async function main() {
	const ContractFactory = await ethers.getContractFactory(process.env.CONTRACT_NAME);
	const contract = await ContractFactory.deploy();

	await contract.deployed();
	console.log(`Contract deployed at: ${contract.address}`);
}


main()
	.then(() => {
		console.log('Deployment script completed successfully');
		process.exit(0);
	})
	.catch((error) => {
		console.error('Error during deployment:', error);
		process.exit(1);
	});
  