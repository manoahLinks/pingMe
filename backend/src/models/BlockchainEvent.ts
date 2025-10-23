import mongoose, { Document, Schema } from 'mongoose';

export interface IBlockchainEvent extends Document {
  _id: string;
  eventId: string; // Unique identifier for the event
  contractAddress: string;
  contractName: string;
  eventName: string;
  blockNumber: number;
  transactionHash: string;
  logIndex: number;
  timestamp: number;
  data: any; // Raw event data
  parsedData: any; // Parsed event arguments
  importance: 'low' | 'medium' | 'high';
  processed: boolean; // Whether AI analysis has been completed
  createdAt: Date;
  updatedAt: Date;
}

const BlockchainEventSchema = new Schema<IBlockchainEvent>({
  eventId: {
    type: String,
    required: true,
    unique: true
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
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  blockNumber: {
    type: Number,
    required: true,
    index: true
  },
  transactionHash: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  logIndex: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true,
    index: true
  },
  data: {
    type: Schema.Types.Mixed,
    required: true
  },
  parsedData: {
    type: Schema.Types.Mixed
  },
  importance: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
    index: true
  },
  processed: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true
});

// Create compound indexes for efficient queries
BlockchainEventSchema.index({ contractAddress: 1, eventName: 1 });
BlockchainEventSchema.index({ blockNumber: 1, logIndex: 1 });
BlockchainEventSchema.index({ timestamp: 1 });
BlockchainEventSchema.index({ processed: 1, importance: 1 });

export const BlockchainEvent = mongoose.model<IBlockchainEvent>('BlockchainEvent', BlockchainEventSchema);
