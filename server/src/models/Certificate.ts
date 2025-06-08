
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import User from './User';

const CertificateSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true,
    },
    certificate_id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    user_id: {
        type: String,
        required: true,
        ref: 'User',
        validate: {
            validator: async function (userId: string): Promise<boolean> {
                const user = await User.findOne({ id: userId, role: 'user' });
                return !!user;
            },
            message: 'user_id must reference a user with role "user".'
        }
    },
    // metadata: {
    //     type: Object,
    //     required: true,
    //     validate: {
    //         validator: function (v: any): boolean {
    //             return Object.keys(v).length > 0;
    //         },
    //         message: 'Metadata cannot be empty'
    //     }
    // },
    hash: {
        type: String,
        required: true,
    },
    txHash: {
        type: String,
        required: true,
    },
    event_id: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string): boolean {
                return /^[a-zA-Z0-9-_]+$/.test(v);
            },
            message: (props: { value: string }) => `${props.value} is not a valid event ID!`
        }
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string): boolean {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
            },
            message: (props: { value: string }) => `${props.value} is not a valid URL!`
        }
    },
    issued_at: {
        type: Date,
        default: Date.now,
        required: true,
        validate: {
            validator: function (v: Date): boolean {
                return v instanceof Date && !isNaN(v.getTime());
            },
            message: 'Issued date must be a valid date!'
        }
    },
    issued_by: {
        type: String,
        required: true,
        ref: 'User',
        validate: {
            validator: async function (userId: string): Promise<boolean> {
                const user = await User.findOne({ id: userId, role: { $in: ['issuer', 'admin'] } });
                return !!user;
            },
            message: 'issued_by must reference a user with role "issuer".'
        }
    },
    status: {
        type: Boolean,
        default: true,  // true for valid, false for revoked
    }
}, {
    timestamps: true,
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

export default mongoose.model('Certificate', CertificateSchema);
