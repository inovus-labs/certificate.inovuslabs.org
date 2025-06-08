
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import User from './User';

const AuditLogSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        required: true,
        unique: true,
    },
    action: {
        type: String,
        required: true,
        enum: [
            'ADD_MANAGER',
            'REMOVE_MANAGER',
            'ADD_CERTIFICATE',
            'REVOKE_CERTIFICATE',
        ],
        index: true
    },
    user_id: {
        type: String,
        required: true,
        ref: 'User',
        validate: {
            validator: async function (userId: string): Promise<boolean> {
                const user = await User.findOne({ id: userId });
                return !!user;
            },
            message: 'user_id must reference a valid user.'
        },
        index: true
    },
    txHash: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false, // No need for updatedAt in audit logs
    },
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            delete ret._id; // Remove _id field
            delete ret.__v; // Remove __v field
            return ret;
        }
    },
    toObject: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            delete ret._id; // Remove _id field
            delete ret.__v; // Remove __v field
            return ret;
        }
    },
});

AuditLogSchema.index({ user_id: 1, action: 1, createdAt: -1 });

export default mongoose.model('AuditLog', AuditLogSchema);