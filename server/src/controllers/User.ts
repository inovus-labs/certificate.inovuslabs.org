
import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';

import { User } from '../models';
import { saveAuditLog } from './AuditLog';
import { contract } from '../../config/contract';
import { DEFAULT_NETWORK } from '../../config/network';



// Add new manager to the contract
export const addManager = async (req: Request, res: Response) => {
  const { address, name, email, mobile } = req.body;
  if (!address || !name || !email || !mobile) {
    return res.status(400).json({ error: 'Address, name, email, and mobile are required' });
  }

  try {
    const newUser: any = await getOrCreateUser({
      name,
      email,
      mobile,
      role: 'issuer',
      address
    });
    if (newUser instanceof Error) {
      return res.status(500).json({ error: newUser.message });
    }

    // Grant the manager role
    const tx = await contract.addHashManager(address);
    await tx.wait();

    await saveAuditLog({
      action: 'ADD_MANAGER',
      user_id: newUser.id,
      txHash: tx.hash,
      description: `Manager added: ${name} (${email})`
    });

    return res.status(200).json({
      message: 'Manager added successfully',
      txHash: tx.hash,
      explorerUrl: `${DEFAULT_NETWORK.blockExplorerUrl}/tx/${tx.hash}`,
    });

  } catch (err: any) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err?.error?.reason
    });
  }
}



// Remove manager from the contract
export const removeManager = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  const user = await User.findOne({ id: user_id });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const address = user.address;
  if (!address) {
    return res.status(400).json({ error: 'User does not have an address' });
  }

  try {
    const tx = await contract.removeHashManager(address);
    await tx.wait();

    const updatedUser = await User.findOneAndUpdate(
      { id: user_id },
      { role: 'user', $unset: { address: "" } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    await saveAuditLog({
      action: 'REMOVE_MANAGER',
      user_id: user.id,
      txHash: tx.hash,
      description: `Manager removed: ${user.name} (${user.email})`
    });

    return res.status(200).json({
      message: 'Manager removed successfully',
      txHash: tx.hash,
      explorerUrl: `${DEFAULT_NETWORK.blockExplorerUrl}/tx/${tx.hash}`,
    });

  } catch (err: any) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err?.error?.reason
    });
  }
}



// Get or create a user
export const getOrCreateUser = async (body: { name: string; email: string; mobile: string; role?: string; address?: string; status?: string }) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, mobile, role, address, status } = body;

    if (!name || !email || !mobile) {
      reject(new Error('Name, email, and mobile are required'));
      return;
    }

    try {
      // Try to find and update the user if exists
      const updateFields: any = { name };
      if (role) updateFields.role = role;
      if (address) updateFields.address = address;
      if (status) updateFields.status = status;

      const updatedUser = await User.findOneAndUpdate(
        { $or: [{ email }, { mobile }] },
        { $set: updateFields },
        { new: true }
      ).select('-__v -createdAt -updatedAt');

      if (updatedUser) {
        resolve(updatedUser);
        return;
      }

      // If not found, create new user
      const newUserData: any = { name, email, mobile };
      if (role) newUserData.role = role;
      if (address) newUserData.address = address;
      if (status) newUserData.status = status;

      const newUser = new User(newUserData);
      const savedUser = await newUser.save();
      resolve(savedUser);
    } catch (err: any) {
      reject(new Error(`Error in getOrCreateUser: ${err.message}`));
    }
  });
}



// Get user by ID
export const getUserById = async (userId: string) => {
  return new Promise((resolve, reject) => {

    User.findOne({ id: userId })
      .then(user => {
        if (!user) {
          reject(new Error('User not found'));
          return;
        }
        resolve(user);
      })
      .catch(err => {
        reject(new Error(`Error fetching user: ${err.message}`));
      });
      
  });
}