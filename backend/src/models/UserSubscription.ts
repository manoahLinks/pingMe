import mongoose, { Document, Schema } from 'mongoose';

export interface IUserSubscription extends Document {
  _id: string;
  userId: string;
  contractAddress: string;
  contractName: string;
  eventTypes: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSubscriptionSchema = new Schema<IUserSubscription>({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  contractAddress: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  contractName: {
    type: String,
    required: true,
    trim: true
  },
  eventTypes: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create compound index for efficient queries
UserSubscriptionSchema.index({ userId: 1, contractAddress: 1 });
UserSubscriptionSchema.index({ contractAddress: 1, isActive: 1 });
UserSubscriptionSchema.index({ userId: 1, isActive: 1 });

export const UserSubscription = mongoose.model<IUserSubscription>('UserSubscription', UserSubscriptionSchema);
