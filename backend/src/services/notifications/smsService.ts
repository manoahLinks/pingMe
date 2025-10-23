import { NotificationMessage } from '../ai/notificationGenerator';

export interface SMSConfig {
  apiKey: string;
  apiSecret: string;
  fromNumber: string;
}

export class SMSService {
  private config: SMSConfig;

  constructor(config: SMSConfig) {
    this.config = config;
  }

  async sendNotification(
    to: string,
    notification: NotificationMessage
  ): Promise<boolean> {
    try {
      console.log(`📱 Sending SMS notification to ${to}`);
      
      // In a real implementation, you would use a service like Twilio, AWS SNS, or similar
      // For now, we'll simulate the SMS sending
      await this.simulateSMSSending(to, notification);
      
      console.log(`✅ SMS notification sent successfully to ${to}`);
      return true;
      
    } catch (error) {
      console.error(`❌ Failed to send SMS notification to ${to}:`, error);
      return false;
    }
  }

  private async simulateSMSSending(to: string, notification: NotificationMessage): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`📱 SMS Content:`);
    console.log(`To: ${to}`);
    console.log(`From: ${this.config.fromNumber}`);
    console.log(`Message: ${this.formatSMSMessage(notification)}`);
  }

  private formatSMSMessage(notification: NotificationMessage): string {
    // SMS messages need to be concise due to character limits
    const urgencyEmoji = this.getUrgencyEmoji(notification.priority);
    const shortMessage = notification.message.length > 140 
      ? notification.message.substring(0, 137) + '...'
      : notification.message;
    
    return `${urgencyEmoji} ${notification.title}\n\n${shortMessage}`;
  }

  private getUrgencyEmoji(priority: string): string {
    switch (priority) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      case 'low': return 'ℹ️';
      default: return '📢';
    }
  }

  async sendBatchNotification(
    to: string,
    notifications: NotificationMessage[]
  ): Promise<boolean> {
    try {
      console.log(`📱 Sending batch SMS notification to ${to} (${notifications.length} notifications)`);
      
      const batchMessage = this.formatBatchSMSMessage(notifications);
      
      await this.simulateSMSSending(to, {
        title: 'Blockchain Events',
        message: batchMessage,
        priority: this.getHighestPriority(notifications),
        channels: ['sms'],
        data: { batchCount: notifications.length }
      });
      
      console.log(`✅ Batch SMS notification sent successfully to ${to}`);
      return true;
      
    } catch (error) {
      console.error(`❌ Failed to send batch SMS notification to ${to}:`, error);
      return false;
    }
  }

  private formatBatchSMSMessage(notifications: NotificationMessage[]): string {
    const highCount = notifications.filter(n => n.priority === 'high').length;
    const mediumCount = notifications.filter(n => n.priority === 'medium').length;
    const lowCount = notifications.filter(n => n.priority === 'low').length;
    
    let message = `${notifications.length} blockchain events: `;
    
    if (highCount > 0) message += `${highCount} urgent `;
    if (mediumCount > 0) message += `${mediumCount} medium `;
    if (lowCount > 0) message += `${lowCount} low priority`;
    
    message += '. Check your email for details.';
    
    return message;
  }

  private getHighestPriority(notifications: NotificationMessage[]): 'low' | 'medium' | 'high' {
    if (notifications.some(n => n.priority === 'high')) return 'high';
    if (notifications.some(n => n.priority === 'medium')) return 'medium';
    return 'low';
  }
}
