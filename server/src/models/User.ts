
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
    validate: {
      validator: function (v: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props: { value: string }) => `${props.value} is not a valid email address!`
    }
  },
  mobile: {
    type: String,
    required: false,
    validate: {
      validator: function (v: string): boolean {
        return !v || /^\d{10}$/.test(v);
      },
      message: (props: { value: string }) => `${props.value} is not a valid 10-digit mobile number!`
    }
  },
  
  role: {
    type: String,
    enum: ['user', 'admin', 'issuer'],
    default: 'user'
  },
  address: {
    type: String,
    required: false
  },

  status: {
    type: Number,
    enum: [0, 1, 2], // 0: inactive, 1: active, 2: suspended
    default: 0, // Default to inactive
    index: true
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

export default mongoose.model('User', UserSchema);
