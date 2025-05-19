
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const AuditLogSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4(),
        required: true,
        unique: true,
    },
    action: {
        type: String,
        required: true,
        enum: ['create', 'update', 'delete'],
    },
    entity: {
        type: String,
        required: true,
        enum: ['certificate', 'template', 'chain', 'admin'],
    },
    details: {
        type: Object,
        required: true
    },
    user_id: {
        type: String,
        required: true,
        ref: 'Admin',
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('AuditLog', AuditLogSchema);