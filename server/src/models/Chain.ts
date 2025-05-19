
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ChainSchema = new mongoose.Schema({
    chain_id: {
        type: String,
        default: uuidv4(),
        required: true,
        unique: true,
    },
    chain: {
        type: String,
        required: true,
        unique: true,
        enum: [
            'Ethereum',
            'Polygon',
            'Celo',
            'Avalanche'
        ],
        default: 'Ethereum',
    },
    network_name: {
        type: String,
        required: true,
        enum: [
            'Sepolia', // Ethereum Testnet
            'Mumbai', // Polygon Testnet
            'Alfajores', // Celo Testnet
            'Fuji' // Avalanche Testnet
        ],
        default: 'Sepolia',
    },
    native_currency: {
        type: String,
        required: true,
        enum: [
            'ETH', // Ethereum
            'MATIC', // Polygon
            'CELO', // Celo
            'AVAX' // Avalanche
        ],
        default: 'ETH',
    },
    block_explorer: {
        type: String,
        required: true,
        enum: [
            'Etherscan',
            'Polygonscan',
            'Celo Explorer',
            'Snowtrace'
        ],
        default: 'Etherscan',
    },
    block_explorer_url: {
        type: String,
        required: true,
        enum: [
            'https://sepolia.etherscan.io',
            'https://mumbai.polygonscan.com',
            'https://explorer.celo.org',
            'https://snowtrace.io'
        ],
        default: 'https://sepolia.etherscan.io',
    },
    rpc_url: {
        type: String,
        required: true,
    },
    contract_address: {
        type: String,
        required: true,
    },
    abi: {
        type: Object,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('Chain', ChainSchema);