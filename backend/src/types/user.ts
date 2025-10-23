export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface UserPreferences {
  id: string;
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

export interface UserSubscription {
  id: string;
  userId: string;
  contractAddress: string;
  contractName: string;
  eventTypes: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationHistory {
  id: string;
  userId: string;
  eventId: string;
  notificationType: 'email' | 'sms' | 'push';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  sentAt: Date;
  delivered: boolean;
  errorMessage?: string;
}

export interface UserSession {
  id: string;
  userId: string;
  deviceId?: string;
  pushToken?: string;
  lastActive: Date;
  isActive: boolean;
}
