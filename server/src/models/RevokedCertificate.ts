
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import User from './User';

const RevokedCertificateSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        // unique: true,
        // required: true,
    },
    certificate_id: {
        type: String,
        required: true,
        ref: 'Certificate',
        validate: {
            validator: async function (certId: string): Promise<boolean> {
                const certificate = await mongoose.model('Certificate').findOne({ certificate_id: certId });
                return !!certificate;
            },
            message: 'certificate_id must reference a valid Certificate.'
        },
        index: true,
    },
    txHash: {
        type: String,
        required: true,
    },
    revoked_by: {
        type: String,
        required: true,
        ref: 'User',
        validate: {
            validator: async function (userId: string): Promise<boolean> {
                const user = await User.findOne({ id: userId, role: { $in: ['issuer', 'admin'] } });
                return !!user;
            },
            message: 'revoked_by must reference a user with role "issuer".'
        }
    },
    reason: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string): boolean {
                return v.length > 0 && v.length <= 500;
            },
            message: (props: { value: string }) => `Reason must be between 1 and 500 characters!`
        }
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model('RevokedCertificate', RevokedCertificateSchema);