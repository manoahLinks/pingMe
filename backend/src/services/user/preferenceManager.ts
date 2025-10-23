import { UserPreferences, UserSubscription } from '../../types/user';

export class PreferenceManager {
  private preferences: Map<string, UserPreferences> = new Map();
  private subscriptions: Map<string, UserSubscription[]> = new Map();

  // User Preferences Management
  async getUserPreferences(userId: string): Promise<UserPreferences | null> {
    return this.preferences.get(userId) || null;
  }

  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    const existing = await this.getUserPreferences(userId);
    
    const updated: UserPreferences = {
      id: existing?.id || `pref_${userId}`,
      userId,
      contracts: preferences.contracts || existing?.contracts || [],
      eventTypes: preferences.eventTypes || existing?.eventTypes || [],
      notificationMethods: preferences.notificationMethods || existing?.notificationMethods || ['email'],
      aiAnalysis: preferences.aiAnalysis ?? existing?.aiAnalysis ?? true,
      urgencyLevel: preferences.urgencyLevel || existing?.urgencyLevel || 'medium',
      language: preferences.language || existing?.language || 'en',
      timezone: preferences.timezone || existing?.timezone || 'UTC',
      quietHours: preferences.quietHours || existing?.quietHours || {
        enabled: false,
        start: '22:00',
        end: '08:00',
        timezone: 'UTC'
      },
      batchNotifications: preferences.batchNotifications ?? existing?.batchNotifications ?? false,
      maxNotificationsPerHour: preferences.maxNotificationsPerHour || existing?.maxNotificationsPerHour || 10,
      createdAt: existing?.createdAt || new Date(),
      updatedAt: new Date()
    };

    this.preferences.set(userId, updated);
    return updated;
  }

  async createDefaultPreferences(userId: string): Promise<UserPreferences> {
    const defaultPreferences: UserPreferences = {
      id: `pref_${userId}`,
      userId,
      contracts: [],
      eventTypes: ['Transfer', 'Swap', 'Sale', 'ProposalCreated'],
      notificationMethods: ['email'],
      aiAnalysis: true,
      urgencyLevel: 'medium',
      language: 'en',
      timezone: 'UTC',
      quietHours: {
        enabled: false,
        start: '22:00',
        end: '08:00',
        timezone: 'UTC'
      },
      batchNotifications: false,
      maxNotificationsPerHour: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.preferences.set(userId, defaultPreferences);
    return defaultPreferences;
  }

  // Subscription Management
  async getUserSubscriptions(userId: string): Promise<UserSubscription[]> {
    return this.subscriptions.get(userId) || [];
  }

  async addSubscription(
    userId: string,
    contractAddress: string,
    contractName: string,
    eventTypes: string[]
  ): Promise<UserSubscription> {
    const subscription: UserSubscription = {
      id: `sub_${userId}_${contractAddress}_${Date.now()}`,
      userId,
      contractAddress,
      contractName,
      eventTypes,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const userSubscriptions = this.subscriptions.get(userId) || [];
    userSubscriptions.push(subscription);
    this.subscriptions.set(userId, userSubscriptions);

    // Update user preferences to include this contract
    const preferences = await this.getUserPreferences(userId);
    if (preferences) {
      if (!preferences.contracts.includes(contractAddress)) {
        preferences.contracts.push(contractAddress);
        await this.updateUserPreferences(userId, preferences);
      }
    }

    return subscription;
  }

  async removeSubscription(userId: string, subscriptionId: string): Promise<boolean> {
    const userSubscriptions = this.subscriptions.get(userId) || [];
    const filtered = userSubscriptions.filter(sub => sub.id !== subscriptionId);
    
    if (filtered.length < userSubscriptions.length) {
      this.subscriptions.set(userId, filtered);
      return true;
    }
    
    return false;
  }

  async updateSubscription(
    userId: string,
    subscriptionId: string,
    updates: Partial<UserSubscription>
  ): Promise<UserSubscription | null> {
    const userSubscriptions = this.subscriptions.get(userId) || [];
    const subscription = userSubscriptions.find(sub => sub.id === subscriptionId);
    
    if (subscription) {
      Object.assign(subscription, updates);
      subscription.updatedAt = new Date();
      return subscription;
    }
    
    return null;
  }

  // Helper methods
  async isUserInterestedInEvent(userId: string, contractAddress: string, eventName: string): Promise<boolean> {
    const preferences = await this.getUserPreferences(userId);
    if (!preferences) return false;

    // Check if user is monitoring this contract
    if (preferences.contracts.length > 0 && !preferences.contracts.includes(contractAddress)) {
      return false;
    }

    // Check if user is interested in this event type
    if (preferences.eventTypes.length > 0 && !preferences.eventTypes.includes(eventName)) {
      return false;
    }

    return true;
  }

  async getUsersForContract(contractAddress: string): Promise<string[]> {
    const interestedUsers: string[] = [];
    
    for (const [userId, preferences] of this.preferences) {
      if (preferences.contracts.includes(contractAddress)) {
        interestedUsers.push(userId);
      }
    }
    
    return interestedUsers;
  }

  async getUsersForEventType(eventName: string): Promise<string[]> {
    const interestedUsers: string[] = [];
    
    for (const [userId, preferences] of this.preferences) {
      if (preferences.eventTypes.includes(eventName)) {
        interestedUsers.push(userId);
      }
    }
    
    return interestedUsers;
  }

  // Check if user is in quiet hours
  async isInQuietHours(userId: string): Promise<boolean> {
    const preferences = await this.getUserPreferences(userId);
    if (!preferences || !preferences.quietHours.enabled) return false;

    const now = new Date();
    const userTimezone = preferences.quietHours.timezone;
    
    // Simple timezone handling (in production, use a proper timezone library)
    const userTime = new Date(now.toLocaleString("en-US", { timeZone: userTimezone }));
    const currentHour = userTime.getHours();
    const currentMinute = userTime.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const [startHour, startMinute] = preferences.quietHours.start.split(':').map(Number);
    const [endHour, endMinute] = preferences.quietHours.end.split(':').map(Number);
    
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    if (startTime < endTime) {
      return currentTime >= startTime && currentTime <= endTime;
    } else {
      // Quiet hours span midnight
      return currentTime >= startTime || currentTime <= endTime;
    }
  }
}
