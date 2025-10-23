import mongoose, { Document, Schema } from 'mongoose';

export interface IUserPreferences extends Document {
  _id: string;
  userId: string;
  contracts: string[]; // Contract addresses to monitor
  eventTypes: string[]; // Event names to track
  notificationMethods: ('email' | 'sms' | 'push')[];
  aiAnalysis: boolean; // Enable AI-powered analysis
  urgencyLevel: 'low' | 'medium' | 'high';
  language: string;
  timezone: string;
  quietHours: {
    enabled: boolean;
    start: string; // HH:MM format
    end: string;   // HH:MM format
    timezone: string;
  };
  batchNotifications: boolean; // Group multiple events into one notification
  maxNotificationsPerHour: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuietHoursSchema = new Schema({
  enabled: {
    type: Boolean,
    default: false
  },
  start: {
    type: String,
    default: '22:00'
  },
  end: {
    type: String,
    default: '08:00'
  },
  timezone: {
    type: String,
    default: 'UTC'
  }
}, { _id: false });

const UserPreferencesSchema = new Schema<IUserPreferences>({
  userId: {
    type: String,
    required: true,
    unique: true,
    ref: 'User'
  },
  contracts: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  eventTypes: [{
    type: String,
    trim: true
  }],
  notificationMethods: [{
    type: String,
    enum: ['email', 'sms', 'push'],
    default: ['email']
  }],
  aiAnalysis: {
    type: Boolean,
    default: true
  },
  urgencyLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  language: {
    type: String,
    default: 'en'
  },
  timezone: {
    type: String,
    default: 'UTC'
  },
  quietHours: {
    type: QuietHoursSchema,
    default: () => ({})
  },
  batchNotifications: {
    type: Boolean,
    default: false
  },
  maxNotificationsPerHour: {
    type: Number,
    default: 10,
    min: 1,
    max: 100
  }
}, {
  timestamps: true
});

// Create index for efficient queries
UserPreferencesSchema.index({ userId: 1 });
UserPreferencesSchema.index({ contracts: 1 });
UserPreferencesSchema.index({ eventTypes: 1 });

export const UserPreferences = mongoose.model<IUserPreferences>('UserPreferences', UserPreferencesSchema);
