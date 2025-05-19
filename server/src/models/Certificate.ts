
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const CertificateSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4(),
    unique: true,
    required: true,
  },
  metadata: {
    type: Object,
    required: true,
    // validate: {
    //   validator: function (v: Record<string, any>): boolean {
    //     const templateFields = (this as any).template?.fields || [];
    //     const metadataKeys = Object.keys(v);
    //     return templateFields.every((field: string) => metadataKeys.includes(field));
    //   },
    //   message: (props: { value: any }) => `Metadata keys do not match template fields: ${JSON.stringify(props.value)}`
    // }
  },
  // template_id: {
  //   type: String,
  //   required: true,
  //   ref: 'Template',
  // },
  // chain_id: {
  //   type: String,
  //   required: true,
  //   ref: 'Chain',
  // },
  hash: {
    type: String,
    required: true,
  },
  txHash: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['issued', 'revoked'],
    default: 'issued',
  },
  // issuer: {
  //   type: String,
  //   required: true,
  //   ref: 'Admin',
  // },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Certificate', CertificateSchema);
