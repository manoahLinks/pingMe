import { EmailService } from './emailService';
import { SMSService } from './smsService';
import { PushService } from './pushService';
import { NotificationMessage } from '../ai/notificationGenerator';
import { PreferenceManager } from '../user/preferenceManager';
import { UserPreferences } from '../../types/user';

export interface NotificationConfig {
  email: {
    from: string;
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPassword: string;
  };
  sms: {
    apiKey: string;
    apiSecret: string;
    fromNumber: string;
  };
  push: {
    vapidKeys: {
      publicKey: string;
      privateKey: string;
    };
    subject: string;
  };
}

export class NotificationManager {
  private emailService: EmailService;
  private smsService: SMSService;
  private pushService: PushService;
  private preferenceManager: PreferenceManager;

  constructor(config: NotificationConfig, preferenceManager: PreferenceManager) {
    this.emailService = new EmailService(config.email);
    this.smsService = new SMSService(config.sms);
    this.pushService = new PushService(config.push);
    this.preferenceManager = preferenceManager;
  }

  async sendNotification(
    userId: string,
    notification: NotificationMessage
  ): Promise<boolean> {
    try {
      const userPreferences = await this.preferenceManager.getUserPreferences(userId);
      if (!userPreferences) {
        console.log(`❌ No preferences found for user ${userId}`);
        return false;
      }

      // Check if user is in quiet hours
      if (await this.preferenceManager.isInQuietHours(userId)) {
        console.log(`🔇 User ${userId} is in quiet hours, skipping notification`);
        return false;
      }

      console.log(`📤 Sending notification to user ${userId} via ${userPreferences.notificationMethods.join(', ')}`);

      const results = await Promise.allSettled(
        userPreferences.notificationMethods.map(method => 
          this.sendViaMethod(userId, method, notification)
        )
      );

      const successCount = results.filter(result => result.status === 'fulfilled').length;
      console.log(`✅ Notification sent via ${successCount}/${userPreferences.notificationMethods.length} methods`);
      
      return successCount > 0;

    } catch (error) {
      console.error(`❌ Failed to send notification to user ${userId}:`, error);
      return false;
    }
  }

  async sendBatchNotification(
    userId: string,
    notifications: NotificationMessage[]
  ): Promise<boolean> {
    try {
      const userPreferences = await this.preferenceManager.getUserPreferences(userId);
      if (!userPreferences) {
        console.log(`❌ No preferences found for user ${userId}`);
        return false;
      }

      // Check if user prefers batch notifications
      if (!userPreferences.batchNotifications) {
        // Send individual notifications
        const results = await Promise.allSettled(
          notifications.map(notification => 
            this.sendNotification(userId, notification)
          )
        );
        return results.some(result => result.status === 'fulfilled');
      }

      // Check if user is in quiet hours
      if (await this.preferenceManager.isInQuietHours(userId)) {
        console.log(`🔇 User ${userId} is in quiet hours, skipping batch notification`);
        return false;
      }

      console.log(`📤 Sending batch notification to user ${userId} (${notifications.length} events)`);

      const results = await Promise.allSettled(
        userPreferences.notificationMethods.map(method => 
          this.sendBatchViaMethod(userId, method, notifications)
        )
      );

      const successCount = results.filter(result => result.status === 'fulfilled').length;
      console.log(`✅ Batch notification sent via ${successCount}/${userPreferences.notificationMethods.length} methods`);
      
      return successCount > 0;

    } catch (error) {
      console.error(`❌ Failed to send batch notification to user ${userId}:`, error);
      return false;
    }
  }

  private async sendViaMethod(
    userId: string,
    method: 'email' | 'sms' | 'push',
    notification: NotificationMessage
  ): Promise<boolean> {
    switch (method) {
      case 'email':
        return await this.emailService.sendNotification(
          await this.getUserEmail(userId),
          notification
        );
      
      case 'sms':
        return await this.smsService.sendNotification(
          await this.getUserPhone(userId),
          notification
        );
      
      case 'push':
        return await this.pushService.sendNotification(userId, notification);
      
      default:
        console.error(`❌ Unknown notification method: ${method}`);
        return false;
    }
  }

  private async sendBatchViaMethod(
    userId: string,
    method: 'email' | 'sms' | 'push',
    notifications: NotificationMessage[]
  ): Promise<boolean> {
    switch (method) {
      case 'email':
        return await this.emailService.sendBatchNotification(
          await this.getUserEmail(userId),
          notifications
        );
      
      case 'sms':
        return await this.smsService.sendBatchNotification(
          await this.getUserPhone(userId),
          notifications
        );
      
      case 'push':
        return await this.pushService.sendBatchNotification(userId, notifications);
      
      default:
        console.error(`❌ Unknown notification method: ${method}`);
        return false;
    }
  }

  private async getUserEmail(userId: string): Promise<string> {
    // In a real implementation, you would fetch this from the database
    // For now, we'll use a mock email
    return `user${userId}@example.com`;
  }

  private async getUserPhone(userId: string): Promise<string> {
    // In a real implementation, you would fetch this from the database
    // For now, we'll use a mock phone number
    return `+1234567890${userId}`;
  }

  // Push subscription management
  async addPushSubscription(userId: string, subscription: any): Promise<void> {
    await this.pushService.addSubscription(userId, subscription);
  }

  async removePushSubscription(userId: string, endpoint: string): Promise<boolean> {
    return await this.pushService.removeSubscription(userId, endpoint);
  }
}
