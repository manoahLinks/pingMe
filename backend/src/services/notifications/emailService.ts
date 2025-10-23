import { NotificationMessage } from '../ai/notificationGenerator';

export interface EmailConfig {
  from: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
}

export class EmailService {
  private config: EmailConfig;

  constructor(config: EmailConfig) {
    this.config = config;
  }

  async sendNotification(
    to: string,
    notification: NotificationMessage
  ): Promise<boolean> {
    try {
      console.log(`📧 Sending email notification to ${to}`);
      
      // In a real implementation, you would use a service like SendGrid, AWS SES, or Nodemailer
      // For now, we'll simulate the email sending
      await this.simulateEmailSending(to, notification);
      
      console.log(`✅ Email notification sent successfully to ${to}`);
      return true;
      
    } catch (error) {
      console.error(`❌ Failed to send email notification to ${to}:`, error);
      return false;
    }
  }

  private async simulateEmailSending(to: string, notification: NotificationMessage): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`📧 Email Content:`);
    console.log(`To: ${to}`);
    console.log(`From: ${this.config.from}`);
    console.log(`Subject: ${notification.title}`);
    console.log(`Body: ${notification.message}`);
    console.log(`Priority: ${notification.priority}`);
  }

  async sendBatchNotification(
    to: string,
    notifications: NotificationMessage[]
  ): Promise<boolean> {
    try {
      console.log(`📧 Sending batch email notification to ${to} (${notifications.length} notifications)`);
      
      const batchTitle = `📊 ${notifications.length} Blockchain Events Summary`;
      const batchMessage = this.formatBatchMessage(notifications);
      
      const batchNotification: NotificationMessage = {
        title: batchTitle,
        message: batchMessage,
        priority: this.getHighestPriority(notifications),
        channels: ['email'],
        data: { batchCount: notifications.length }
      };
      
      await this.simulateEmailSending(to, batchNotification);
      
      console.log(`✅ Batch email notification sent successfully to ${to}`);
      return true;
      
    } catch (error) {
      console.error(`❌ Failed to send batch email notification to ${to}:`, error);
      return false;
    }
  }

  private formatBatchMessage(notifications: NotificationMessage[]): string {
    let message = `You have ${notifications.length} new blockchain events:\n\n`;
    
    const highPriority = notifications.filter(n => n.priority === 'high');
    const mediumPriority = notifications.filter(n => n.priority === 'medium');
    const lowPriority = notifications.filter(n => n.priority === 'low');
    
    if (highPriority.length > 0) {
      message += `🚨 High Priority (${highPriority.length}):\n`;
      highPriority.forEach(notification => {
        message += `• ${notification.title}\n`;
      });
      message += '\n';
    }
    
    if (mediumPriority.length > 0) {
      message += `⚠️ Medium Priority (${mediumPriority.length}):\n`;
      mediumPriority.forEach(notification => {
        message += `• ${notification.title}\n`;
      });
      message += '\n';
    }
    
    if (lowPriority.length > 0) {
      message += `ℹ️ Low Priority (${lowPriority.length}):\n`;
      lowPriority.forEach(notification => {
        message += `• ${notification.title}\n`;
      });
    }
    
    return message;
  }

  private getHighestPriority(notifications: NotificationMessage[]): 'low' | 'medium' | 'high' {
    if (notifications.some(n => n.priority === 'high')) return 'high';
    if (notifications.some(n => n.priority === 'medium')) return 'medium';
    return 'low';
  }
}
