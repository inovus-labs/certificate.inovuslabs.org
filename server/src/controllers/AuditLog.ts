
import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import { AuditLog } from '../models';



// Save an audit log entry
export const saveAuditLog = async ({action, user_id, txHash, description}: {
  action: string;
  user_id: string;
  txHash: string;
  description?: string;
}) => {
  if (!action || !user_id || !txHash) {
    console.error("Missing required parameters for audit log");
    return;
  }
  try {
    const log = new AuditLog({
      user_id: user_id,
      action,
      txHash,
      description
    });
    await log.save();
    // console.log(`Audit log saved for action: ${action}`);
  }
  catch (error) {
    console.error("Error saving audit log: ", error);
  }
  return;
}



// Get all audit logs with optional filters
export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const { user, action, from, to } = req.query;

    // Build filter object
    const filter: any = {};
    if (user) filter.userId = user;
    if (action) filter.action = action;
    if (from || to) {
      filter.timestamp = {};
      if (from) filter.timestamp.$gte = new Date(from as string);
      if (to) filter.timestamp.$lte = new Date(to as string);
    }

    const logs = await AuditLog.find(filter).sort({ timestamp: -1 });
    return res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching audit logs: ", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
