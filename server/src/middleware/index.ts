
import { Request, Response, NextFunction } from 'express';
import { contract } from '../../config/contract';
import { getUserById } from '../controllers/User';



// Authentication Middleware
export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const userId = process.env.ISSUER_ID;
    if (!userId) {
        return res.status(401).json({ message: 'No ISSUER_ID provided in environment' });
    }

    try {
        const user : any = await getUserById(userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (user.address && user.role !== 'admin' && user.role !== 'issuer') {
            return res.status(403).json({ message: 'Forbidden: insufficient role' });
        }

        // @ts-ignore
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
}



// Authorization Middleware
type RoleType = 'admin' | 'issuer' | 'user';

export function authorize(roles: RoleType[] = []) {
    return async (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore
        const user : any = req.user;
        if (!user || !user.address) {
            return res.status(403).json({ message: 'Forbidden: user not authenticated' });
        }

        try {
            let hasRole = false;
            for (const role of roles) {
                if (role === 'admin') {
                    hasRole = await contract.hasAdminRole(user.address);
                } else if (role === 'issuer') {
                    hasRole = await contract.hasHashManagerRole(user.address);
                }
                if (hasRole) break;
            }

            if (!hasRole) {
                return res.status(403).json({ message: 'Forbidden: insufficient role' });
            }

            next();
        } catch (err) {
            return res.status(500).json({ message: 'Role check failed', error: err });
        }
    };
}
