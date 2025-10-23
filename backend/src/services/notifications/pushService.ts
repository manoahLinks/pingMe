import { NotificationMessage } from '../ai/notificationGenerator';

export interface PushConfig {
  vapidKeys: {
    publicKey: string;
    privateKey: string;
  };
  subject: string;
}

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export class PushService {
  private config: PushConfig;
  private subscriptions: Map<string, PushSubscription[]> = new Map();

  constructor(config: PushConfig) {
    this.config = config;
  }

  async addSubscription(userId: string, subscription: PushSubscription): Promise<void> {
    const userSubscriptions = this.subscriptions.get(userId) || [];
    userSubscriptions.push(subscription);
    this.subscriptions.set(userId, userSubscriptions);
    
    console.log(`📱 Added push subscription for user ${userId}`);
  }

  async removeSubscription(userId: string, endpoint: string): Promise<boolean> {
    const userSubscriptions = this.subscriptions.get(userId) || [];
    const filtered = userSubscriptions.filter(sub => sub.endpoint !== endpoint);
    
    if (filtered.length < userSubscriptions.length) {
      this.subscriptions.set(userId, filtered);
      console.log(`📱 Removed push subscription for user ${userId}`);
      return true;
    }
    
    return false;
  }

  async sendNotification(
    userId: string,
    notification: NotificationMessage
  ): Promise<boolean> {
    try {
      const userSubscriptions = this.subscriptions.get(userId);
      if (!userSubscriptions || userSubscriptions.length === 0) {
        console.log(`📱 No push subscriptions found for user ${userId}`);
        return false;
      }

      console.log(`📱 Sending push notification to user ${userId} (${userSubscriptions.length} devices)`);
      
      // Send to all user's devices
      const results = await Promise.allSettled(
        userSubscriptions.map(subscription => 
          this.sendToDevice(subscription, notification)
        )
      );

      const successCount = results.filter(result => result.status === 'fulfilled').length;
      console.log(`✅ Push notification sent to ${successCount}/${userSubscriptions.length} devices`);
      
      return successCount > 0;
      
    } catch (error) {
      console.error(`❌ Failed to send push notification to user ${userId}:`, error);
      return false;
    }
  }

  private async sendToDevice(
    subscription: PushSubscription,
    notification: NotificationMessage
  ): Promise<void> {
    try {
      // In a real implementation, you would use the Web Push library
      // For now, we'll simulate the push notification
      await this.simulatePushSending(subscription, notification);
      
    } catch (error) {
      console.error(`❌ Failed to send push to device ${subscription.endpoint}:`, error);
      throw error;
    }
  }

  private async simulatePushSending(
    subscription: PushSubscription,
    notification: NotificationMessage
  ): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log(`📱 Push Notification:`);
    console.log(`Device: ${subscription.endpoint.substring(0, 20)}...`);
    console.log(`Title: ${notification.title}`);
    console.log(`Message: ${notification.message.substring(0, 100)}...`);
    console.log(`Priority: ${notification.priority}`);
  }

  async sendBatchNotification(
    userId: string,
    notifications: NotificationMessage[]
  ): Promise<boolean> {
    try {
      const userSubscriptions = this.subscriptions.get(userId);
      if (!userSubscriptions || userSubscriptions.length === 0) {
        console.log(`📱 No push subscriptions found for user ${userId}`);
        return false;
      }

      console.log(`📱 Sending batch push notification to user ${userId} (${notifications.length} notifications)`);
      
      const batchNotification: NotificationMessage = {
        title: `📊 ${notifications.length} Blockchain Events`,
        message: this.formatBatchMessage(notifications),
        priority: this.getHighestPriority(notifications),
        channels: ['push'],
        data: { batchCount: notifications.length }
      };
      
      const results = await Promise.allSettled(
        userSubscriptions.map(subscription => 
          this.sendToDevice(subscription, batchNotification)
        )
      );

      const successCount = results.filter(result => result.status === 'fulfilled').length;
      console.log(`✅ Batch push notification sent to ${successCount}/${userSubscriptions.length} devices`);
      
      return successCount > 0;
      
    } catch (error) {
      console.error(`❌ Failed to send batch push notification to user ${userId}:`, error);
      return false;
    }
  }

  private formatBatchMessage(notifications: NotificationMessage[]): string {
    const highCount = notifications.filter(n => n.priority === 'high').length;
    const mediumCount = notifications.filter(n => n.priority === 'medium').length;
    const lowCount = notifications.filter(n => n.priority === 'low').length;
    
    let message = `You have ${notifications.length} new blockchain events: `;
    
    if (highCount > 0) message += `${highCount} urgent, `;
    if (mediumCount > 0) message += `${mediumCount} medium priority, `;
    if (lowCount > 0) message += `${lowCount} low priority`;
    
    message += '. Tap to view details.';
    
    return message;
  }

  private getHighestPriority(notifications: NotificationMessage[]): 'low' | 'medium' | 'high' {
    if (notifications.some(n => n.priority === 'high')) return 'high';
    if (notifications.some(n => n.priority === 'medium')) return 'medium';
    return 'low';
  }

  async getUserSubscriptionCount(userId: string): Promise<number> {
    const userSubscriptions = this.subscriptions.get(userId) || [];
    return userSubscriptions.length;
  }

  async getAllSubscriptions(): Promise<Map<string, PushSubscription[]>> {
    return new Map(this.subscriptions);
  }
}
