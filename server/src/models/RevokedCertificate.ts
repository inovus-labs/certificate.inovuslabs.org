
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const RevokedCertificateSchema = new mongoose.Schema({
    revoked_id: {
        type: String,
        default: uuidv4(),
        required: true,
        unique: true,
    },
    certificate_id: {
        type: String,
        required: true,
        ref: 'Certificate',
    },
    reason: {
        type: String,
        required: true,
    },
    revoked_by: {
        type: String,
        required: true,
        ref: 'Admin',
    },
    revoked_at: {
        type: Date,
        default: Date.now,
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

export default mongoose.model('RevokedCertificate', RevokedCertificateSchema);