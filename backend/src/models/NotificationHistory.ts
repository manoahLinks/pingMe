import mongoose, { Document, Schema } from 'mongoose';

export interface INotificationHistory extends Document {
  _id: string;
  userId: string;
  eventId: string;
  notificationType: 'email' | 'sms' | 'push';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  sentAt: Date;
  delivered: boolean;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationHistorySchema = new Schema<INotificationHistory>({
  userId: {
    type: String,
    required: true,
    ref: 'User',
    index: true
  },
  eventId: {
    type: String,
    required: true,
    ref: 'BlockchainEvent'
  },
  notificationType: {
    type: String,
    required: true,
    enum: ['email', 'sms', 'push'],
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'],
    index: true
  },
  sentAt: {
    type: Date,
    required: true,
    index: true
  },
  delivered: {
    type: Boolean,
    default: false,
    index: true
  },
  errorMessage: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Create compound indexes for efficient queries
NotificationHistorySchema.index({ userId: 1, sentAt: -1 });
NotificationHistorySchema.index({ eventId: 1 });
NotificationHistorySchema.index({ delivered: 1, sentAt: -1 });

export const NotificationHistory = mongoose.model<INotificationHistory>('NotificationHistory', NotificationHistorySchema);
