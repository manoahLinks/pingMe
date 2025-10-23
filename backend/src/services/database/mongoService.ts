import mongoose from 'mongoose';
import { User } from '../../models/User';
import { UserPreferences } from '../../models/UserPreferences';
import { UserSubscription } from '../../models/UserSubscription';
import { BlockchainEvent } from '../../models/BlockchainEvent';
import { NotificationHistory } from '../../models/NotificationHistory';

export interface MongoConfig {
  uri: string;
  options?: mongoose.ConnectOptions;
}

export class MongoService {
  private config: MongoConfig;
  private isConnected: boolean = false;

  constructor(config: MongoConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    try {
      if (this.isConnected) {
        console.log('📊 MongoDB already connected');
        return;
      }

      console.log('🔌 Connecting to MongoDB...');
      
      await mongoose.connect(this.config.uri, {
        ...this.config.options,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      this.isConnected = true;
      console.log('✅ MongoDB connected successfully');

      // Set up connection event listeners
      mongoose.connection.on('error', (error) => {
        console.error('❌ MongoDB connection error:', error);
        this.isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        console.log('🔌 MongoDB disconnected');
        this.isConnected = false;
      });

      mongoose.connection.on('reconnected', () => {
        console.log('🔄 MongoDB reconnected');
        this.isConnected = true;
      });

    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (!this.isConnected) {
        console.log('📊 MongoDB not connected');
        return;
      }

      await mongoose.disconnect();
      this.isConnected = false;
      console.log('✅ MongoDB disconnected successfully');

    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error);
      throw error;
    }
  }

  getStatus(): { connected: boolean; readyState: number } {
    return {
      connected: this.isConnected,
      readyState: mongoose.connection.readyState
    };
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      if (!this.isConnected) return false;
      
      if (mongoose.connection.db) {
        await mongoose.connection.db.admin().ping();
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ MongoDB health check failed:', error);
      return false;
    }
  }

  // Get all models for easy access
  getModels() {
    return {
      User,
      UserPreferences,
      UserSubscription,
      BlockchainEvent,
      NotificationHistory
    };
  }
}
