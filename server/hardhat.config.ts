
import * as dotenv from "dotenv";
dotenv.config();

import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/config";

import { DEFAULT_NETWORK } from "./config/network";



const config: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
    cache: "./cache",
  },
  networks: {
    sepolia: {
      url: DEFAULT_NETWORK.rpcUrl,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
};

export default config;
