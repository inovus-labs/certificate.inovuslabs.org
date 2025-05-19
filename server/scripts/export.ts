
import dotenv from 'dotenv';
dotenv.config();

import fs from "fs";
import path from "path";

if (!process.env.CONTRACT_NAME) {
    throw new Error('CONTRACT_NAME environment variable is not set');
}

const CONTRACT = process.env.CONTRACT_NAME;
const artifactPath = path.join(__dirname, `../artifacts/contracts/${CONTRACT}.sol/${CONTRACT}.json`);
const targetPath = path.join(__dirname, `../src/abi/${CONTRACT}.json`);

fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.copyFileSync(artifactPath, targetPath);

console.log(`Exported ${CONTRACT} ABI + bytecode to src/abi`);
