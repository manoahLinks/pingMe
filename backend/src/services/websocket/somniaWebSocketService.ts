import { SomniaWebSocketListener, SomniaWebSocketConfig } from './somniaWebSocketListener';
import { EventAnalyzer } from '../ai/eventAnalyzer';
import { NotificationGenerator } from '../ai/notificationGenerator';
import { NotificationManager } from '../notifications/notificationManager';
import { PreferenceManager } from '../user/preferenceManager';
import { MongoService } from '../database/mongoService';
import { BlockchainEvent } from '../../models/BlockchainEvent';
import { NotificationHistory } from '../../models/NotificationHistory';

export interface SomniaWebSocketServiceConfig {
  somnia: SomniaWebSocketConfig;
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

export class SomniaWebSocketService {
  private somniaListener: SomniaWebSocketListener;
  private eventAnalyzer: EventAnalyzer;
  private notificationGenerator: NotificationGenerator;
  private notificationManager: NotificationManager;
  private preferenceManager: PreferenceManager;
  private mongoService: MongoService;
  private isRunning: boolean = false;

  constructor(config: SomniaWebSocketServiceConfig) {
    // Initialize services
    this.somniaListener = new SomniaWebSocketListener(config.somnia);
    this.eventAnalyzer = new EventAnalyzer(config.ai.apiKey);
    this.notificationGenerator = new NotificationGenerator();
    this.preferenceManager = new PreferenceManager();
    this.mongoService = new MongoService({ uri: config.database.uri });
    this.notificationManager = new NotificationManager(config.notifications, this.preferenceManager);

    // Set up event handlers
    this.setupEventHandlers();
  }

  async start(): Promise<void> {
    try {
      console.log('🚀 Starting Somnia WebSocket Service...');

      // Connect to database
      await this.mongoService.connect();

      // Start Somnia listener
      await this.somniaListener.start();

      this.isRunning = true;
      console.log('✅ Somnia WebSocket Service started successfully');

    } catch (error) {
      console.error('❌ Failed to start Somnia WebSocket Service:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      console.log('🛑 Stopping Somnia WebSocket Service...');

      // Stop Somnia listener
      await this.somniaListener.stop();

      // Disconnect from database
      await this.mongoService.disconnect();

      this.isRunning = false;
      console.log('✅ Somnia WebSocket Service stopped successfully');

    } catch (error) {
      console.error('❌ Error stopping Somnia WebSocket Service:', error);
      throw error;
    }
  }

  private setupEventHandlers(): void {
    // Register custom event handlers for each event type
    this.somniaListener.registerEventHandler('GreetingSet', async (log, contract) => {
      await this.handleGreetingSetEvent(log, contract);
    });

    this.somniaListener.registerEventHandler('UserMessage', async (log, contract) => {
      await this.handleUserMessageEvent(log, contract);
    });

    // Add more event handlers as needed
    console.log('🔧 Event handlers registered');
  }

  private async handleGreetingSetEvent(log: any, contract: any): Promise<void> {
    try {
      console.log('🔔 Processing GreetingSet event...');

      // Parse the event data
      const parsedLog = contract.interface.parseLog({
        topics: log.topics,
        data: log.data
      });

      const eventData = {
        id: `${log.transactionHash}-${log.index}`,
        contractAddress: this.somniaListener.getStatus().contractAddress,
        contractName: 'Greeting Contract',
        eventName: 'GreetingSet',
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
        timestamp: Math.floor(Date.now() / 1000),
        data: log,
        parsedData: parsedLog?.args
      };

      // Save event to database
      await this.saveEventToDatabase(eventData);

      // Process for interested users
      await this.processEventForUsers(eventData);

    } catch (error) {
      console.error('❌ Error handling GreetingSet event:', error);
    }
  }

  private async handleUserMessageEvent(log: any, contract: any): Promise<void> {
    try {
      console.log('🔔 Processing UserMessage event...');

      // Parse the event data
      const parsedLog = contract.interface.parseLog({
        topics: log.topics,
        data: log.data
      });

      const eventData = {
        id: `${log.transactionHash}-${log.index}`,
        contractAddress: this.somniaListener.getStatus().contractAddress,
        contractName: 'Greeting Contract',
        eventName: 'UserMessage',
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
        timestamp: Math.floor(Date.now() / 1000),
        data: log,
        parsedData: parsedLog?.args
      };

      // Save event to database
      await this.saveEventToDatabase(eventData);

      // Process for interested users
      await this.processEventForUsers(eventData);

    } catch (error) {
      console.error('❌ Error handling UserMessage event:', error);
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
    const highImportanceEvents = ['GreetingSet', 'UserMessage'];
    const mediumImportanceEvents = ['Deposit', 'Withdrawal'];
    
    if (highImportanceEvents.includes(eventName)) return 'high';
    if (mediumImportanceEvents.includes(eventName)) return 'medium';
    return 'low';
  }

  private async processEventForUsers(eventData: any): Promise<void> {
    try {
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
          await this.processEventForUser(userId, eventData);
        } catch (error) {
          console.error(`❌ Error processing event for user ${userId}:`, error);
        }
      }

    } catch (error) {
      console.error('❌ Error processing event for users:', error);
    }
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

  private async processEventForUser(userId: string, eventData: any): Promise<void> {
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
      const analysis = await this.eventAnalyzer.analyzeEvent(eventData);
      console.log(`🤖 AI analysis completed for user ${userId}`);

      // Generate notification
      const notification = this.notificationGenerator.generateNotification(
        eventData,
        analysis,
        preferences
      );

      // Send notification
      const success = await this.notificationManager.sendNotification(
        userId,
        notification
      );

      // Log notification history
      await this.logNotificationHistory(userId, eventData.id, notification, success);

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
