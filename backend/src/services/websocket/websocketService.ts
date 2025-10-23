import { SomniaListener, SomniaListenerConfig } from './somniaListener';
import { EventAnalyzer } from '../ai/eventAnalyzer';
import { NotificationGenerator } from '../ai/notificationGenerator';
import { NotificationManager } from '../notifications/notificationManager';
import { PreferenceManager } from '../user/preferenceManager';
import { MongoService } from '../database/mongoService';
import { BlockchainEvent } from '../../models/BlockchainEvent';
import { NotificationHistory } from '../../models/NotificationHistory';

export interface WebSocketServiceConfig {
  somnia: SomniaListenerConfig;
  ai: {
    apiKey: string;
  };
  notifications: {
    email: any;
    sms: any;
    push: any;
  };
  database: {
    uri: string;
  };
}

export class WebSocketService {
  private somniaListener: SomniaListener;
  private eventAnalyzer: EventAnalyzer;
  private notificationGenerator: NotificationGenerator;
  private notificationManager: NotificationManager;
  private preferenceManager: PreferenceManager;
  private mongoService: MongoService;
  private isRunning: boolean = false;

  constructor(config: WebSocketServiceConfig) {
    // Initialize services
    this.somniaListener = new SomniaListener(config.somnia);
    this.eventAnalyzer = new EventAnalyzer(config.ai.apiKey);
    this.notificationGenerator = new NotificationGenerator();
    this.preferenceManager = new PreferenceManager();
    this.mongoService = new MongoService({ uri: config.database.uri });
    this.notificationManager = new NotificationManager(config.notifications, this.preferenceManager);

    // Set up event handling
    this.setupEventHandlers();
  }

  async start(): Promise<void> {
    try {
      console.log('🚀 Starting WebSocket Service...');

      // Connect to database
      await this.mongoService.connect();

      // Start Somnia listener
      await this.somniaListener.start();

      this.isRunning = true;
      console.log('✅ WebSocket Service started successfully');

    } catch (error) {
      console.error('❌ Failed to start WebSocket Service:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      console.log('🛑 Stopping WebSocket Service...');

      // Stop Somnia listener
      await this.somniaListener.stop();

      // Disconnect from database
      await this.mongoService.disconnect();

      this.isRunning = false;
      console.log('✅ WebSocket Service stopped successfully');

    } catch (error) {
      console.error('❌ Error stopping WebSocket Service:', error);
      throw error;
    }
  }

  private setupEventHandlers(): void {
    // This would be called when the SomniaListener emits events
    // For now, we'll simulate the event handling flow
    console.log('🔧 Setting up event handlers...');
  }

  async processEvent(eventData: any): Promise<void> {
    try {
      console.log(`📊 Processing event: ${eventData.eventName} from ${eventData.contractName}`);

      // Save event to database
      const savedEvent = await this.saveEventToDatabase(eventData);
      console.log(`💾 Event saved to database: ${savedEvent._id}`);

      // Get users interested in this event
      const interestedUsers = await this.getInterestedUsers(eventData);
      console.log(`👥 Found ${interestedUsers.length} interested users`);

      if (interestedUsers.length === 0) {
        console.log('ℹ️ No users interested in this event');
        return;
      }

      // Process for each interested user
      for (const userId of interestedUsers) {
        try {
          await this.processEventForUser(userId, savedEvent);
        } catch (error) {
          console.error(`❌ Error processing event for user ${userId}:`, error);
        }
      }

    } catch (error) {
      console.error('❌ Error processing event:', error);
    }
  }

  private async saveEventToDatabase(eventData: any): Promise<any> {
    const { BlockchainEvent } = this.mongoService.getModels();
    
    const event = new BlockchainEvent({
      eventId: eventData.id,
      contractAddress: eventData.contractAddress,
      contractName: eventData.contractName,
      eventName: eventData.eventName,
      blockNumber: eventData.blockNumber,
      transactionHash: eventData.transactionHash,
      logIndex: eventData.data.index,
      timestamp: eventData.timestamp,
      data: eventData.data,
      parsedData: eventData.parsedData,
      importance: this.determineImportance(eventData.eventName),
      processed: false
    });

    return await event.save();
  }

  private determineImportance(eventName: string): 'low' | 'medium' | 'high' {
    const highImportanceEvents = [
      'Transfer', 'Approval', 'Swap', 'LiquidityAdded', 'LiquidityRemoved',
      'Sale', 'BidPlaced', 'ProposalCreated', 'VoteCast'
    ];

    const mediumImportanceEvents = [
      'Deposit', 'Withdrawal', 'Stake', 'Unstake', 'Claim'
    ];

    if (highImportanceEvents.includes(eventName)) return 'high';
    if (mediumImportanceEvents.includes(eventName)) return 'medium';
    return 'low';
  }

  private async getInterestedUsers(eventData: any): Promise<string[]> {
    const { UserPreferences } = this.mongoService.getModels();
    
    // Find users monitoring this contract
    const contractUsers = await UserPreferences.find({
      contracts: eventData.contractAddress
    }).select('userId');

    // Find users interested in this event type
    const eventTypeUsers = await UserPreferences.find({
      eventTypes: eventData.eventName
    }).select('userId');

    // Combine and deduplicate
    const allUsers = [...contractUsers, ...eventTypeUsers];
    const uniqueUsers = [...new Set(allUsers.map(u => u.userId))];

    return uniqueUsers;
  }

  private async processEventForUser(userId: string, event: any): Promise<void> {
    try {
      // Get user preferences
      const preferences = await this.preferenceManager.getUserPreferences(userId);
      if (!preferences) {
        console.log(`❌ No preferences found for user ${userId}`);
        return;
      }

      // Check if user is in quiet hours
      if (await this.preferenceManager.isInQuietHours(userId)) {
        console.log(`🔇 User ${userId} is in quiet hours, skipping notification`);
        return;
      }

      // Analyze event with AI
      const analysis = await this.eventAnalyzer.analyzeEvent(event);
      console.log(`🤖 AI analysis completed for user ${userId}`);

      // Generate notification
      const notification = this.notificationGenerator.generateNotification(
        event,
        analysis,
        preferences
      );

      // Send notification
      const success = await this.notificationManager.sendNotification(
        userId,
        notification
      );

      // Log notification history
      await this.logNotificationHistory(userId, event._id, notification, success);

      if (success) {
        console.log(`✅ Notification sent to user ${userId}`);
      } else {
        console.log(`❌ Failed to send notification to user ${userId}`);
      }

    } catch (error) {
      console.error(`❌ Error processing event for user ${userId}:`, error);
    }
  }

  private async logNotificationHistory(
    userId: string,
    eventId: string,
    notification: any,
    success: boolean
  ): Promise<void> {
    const { NotificationHistory } = this.mongoService.getModels();
    
    for (const channel of notification.channels) {
      const history = new NotificationHistory({
        userId,
        eventId,
        notificationType: channel,
        title: notification.title,
        message: notification.message,
        priority: notification.priority,
        sentAt: new Date(),
        delivered: success,
        errorMessage: success ? undefined : 'Failed to deliver notification'
      });

      await history.save();
    }
  }

  getStatus(): { running: boolean; database: any; somnia: any } {
    return {
      running: this.isRunning,
      database: this.mongoService.getStatus(),
      somnia: this.somniaListener.getStatus()
    };
  }
}
