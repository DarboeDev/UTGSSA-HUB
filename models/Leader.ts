import mongoose, { Document, Schema } from 'mongoose';

export interface ILeader extends Document {
  name: string;
  position: string;
  department: string;
  year: string;
  bio: string;
  email: string;
  image: string;
  imagePublicId: string;
  isExecutive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LeaderSchema = new Schema<ILeader>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  imagePublicId: {
    type: String,
    required: true,
  },
  isExecutive: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Leader || mongoose.model<ILeader>('Leader', LeaderSchema);