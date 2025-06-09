
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

  const isAdmin = await contract.hasAdminRole(address);
  if (!isAdmin) {
    return res.status(403).json({ error: 'Forbidden: You do not have permission to add a manager' });
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
    
    // Grant the manager role to the address
    const isManager = await contract.hasHashManagerRole(address);
    if (isManager) {
      return res.status(400).json({ error: 'Address already has manager role' });
    }

    // Grant the manager role
    const tx = await contract.grantHashManagerRole(address);
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
    console.error("Error adding manager: ", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}



// Remove manager from the contract
export const removeManager = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  // const isAdmin = await contract.hasAdminRole(address);
  // if (!isAdmin) {
  //   return res.status(403).json({ error: 'Forbidden: You do not have permission to remove a manager' });
  // }

  const user = await User.findOne({ id: user_id });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const address = user.address;
  if (!address) {
    return res.status(400).json({ error: 'User does not have an address' });
  }
  
  const isManager = await contract.hasHashManagerRole(address);
  if (!isManager) {
    return res.status(400).json({ error: 'Address does not have manager role' });
  }

  try {
    const tx = await contract.revokeHashManagerRole(address);
    await tx.wait();

    const updatedUser = await User.findOneAndUpdate(
      { id: user_id },
      { role: 'user', address: null },
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
    console.error("Error removing manager: ", err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}



// Get or create a user
export const getOrCreateUser = async (body: { name: string; email: string; mobile: string; role?: string; address?: string; status?: string }) => {
  return new Promise((resolve, reject) => {

    const { name, email, mobile, role, address } = body;

    if (!name || !email || !mobile) {
      reject(new Error('Name, email, and mobile are required'));
      return;
    }

    User.findOne({ $or: [{ email }, { mobile }] })
      .select('-__v -createdAt -updatedAt')
      .then(existingUser => {
        if (existingUser) {
          resolve(existingUser);
          return;
        }

        const newUserData: any = { name, email, mobile };
        if (role) newUserData.role = role;
        if (address) newUserData.address = address;

        const newUser = new User(newUserData);

        newUser.save()
          .then(savedUser => {
            resolve(savedUser);
          })
          .catch(err => {
            reject(new Error(`Error saving user: ${err.message}`));
          });
      })
      .catch(err => {
        reject(new Error(`Error creating user: ${err.message}`));
      });
      
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