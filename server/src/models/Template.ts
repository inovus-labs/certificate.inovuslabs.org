
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const TemplateSchema = new mongoose.Schema({
    template_id: {
        type: String,
        default: uuidv4(),
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    fields: {
        type: Array,
        required: true,
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

export default mongoose.model('Template', TemplateSchema);