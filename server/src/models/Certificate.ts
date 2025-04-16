
import { nanoid } from 'nanoid'
import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => nanoid(10),
    unique: true,
  },
  metadata: {
    type: Object,
    required: true,
    validate: {
      validator: (v) => {
        const templateFields = this.template.fields;
        const metadataKeys = Object.keys(v);
        return templateFields.every(field => metadataKeys.includes(field));
      },
      message: props => `Metadata keys do not match template fields: ${props.value}`
    }
  },
  templateId: {
    type: String,
    required: true,
    ref: 'Template',
  },
  hash: {
    type: String,
    required: true,
  },
  txHash: {
    type: String,
    required: true,
  },
  contractAddress: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Certificate', CertificateSchema);
