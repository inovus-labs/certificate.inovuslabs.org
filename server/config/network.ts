
import dotenv from 'dotenv';
dotenv.config();

export const NETWORKS = [
    {
        name: 'Ethereum Sepolia',
        rpcUrl: process.env.ALCHEMY_RPC_URL,
        blockExplorerUrl: 'https://sepolia.etherscan.io',
        etherScanApiUrl: 'https://api-sepolia.etherscan.io',
        etherScanApiKey: process.env.ETHERSCAN_API_KEY,
    },
    {
        name: 'Ethereum Mainnet',
        rpcUrl: process.env.ALCHEMY_RPC_URL,
        blockExplorerUrl: 'https://etherscan.io',
        etherScanApiUrl: 'https://api.etherscan.io/api',
        etherScanApiKey: process.env.ETHERSCAN_API_KEY,
    }
]

export const DEFAULT_NETWORK = NETWORKS[0];
