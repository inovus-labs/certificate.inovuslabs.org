
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { Request, Response } from 'express';
import { DEFAULT_NETWORK } from '../../config/network';



// Get Transaction by Hash
export const getTransactionByHash = async (req: Request, res: Response) => {
  const { txHash } = req.params;
  try {
    const etherscanUrl = `${DEFAULT_NETWORK.etherScanApiUrl}/api?chainid=1&module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${DEFAULT_NETWORK.etherScanApiKey}`;

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
        network: DEFAULT_NETWORK.name,
        explorerUrl: `${DEFAULT_NETWORK.blockExplorerUrl}/tx/${txHash}`,
      }
    });
    
  } catch (err: any) {
    console.error("Error fetching transaction: ", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
