
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const AdminSchema = new mongoose.Schema({
    admin_id: {
        type: String,
        default: uuidv4(),
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'],
    },
    role: {
        type: String,
        required: true,
        enum: ['owner', 'issuer'],
        default: 'issuer',
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

export default mongoose.model('Admin', AdminSchema);