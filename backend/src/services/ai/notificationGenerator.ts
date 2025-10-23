import { AIAnalysis } from './eventAnalyzer';
import { ProcessedEvent } from '../websocket/eventProcessor';

export interface UserPreferences {
  userId: string;
  contracts: string[];
  eventTypes: string[];
  notificationMethods: ('email' | 'sms' | 'push')[];
  aiAnalysis: boolean;
  urgencyLevel: 'low' | 'medium' | 'high';
  language: string;
}

export interface NotificationMessage {
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  channels: ('email' | 'sms' | 'push')[];
  data?: any;
}

export class NotificationGenerator {
  generateNotification(
    event: ProcessedEvent,
    analysis: AIAnalysis,
    userPreferences: UserPreferences
  ): NotificationMessage {
    // Check if user wants notifications for this event type
    if (!this.shouldNotifyUser(event, userPreferences)) {
      throw new Error('User not interested in this event type');
    }

    // Check urgency level
    if (!this.meetsUrgencyLevel(analysis.urgency, userPreferences.urgencyLevel)) {
      throw new Error('Event urgency below user threshold');
    }

    const title = this.generateTitle(event, analysis);
    const message = this.generateMessage(event, analysis, userPreferences);
    const priority = this.determinePriority(analysis.urgency);

    return {
      title,
      message,
      priority,
      channels: userPreferences.notificationMethods,
      data: {
        eventId: event.id,
        contractName: event.contractName,
        eventName: event.eventName,
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
        timestamp: event.timestamp
      }
    };
  }

  private shouldNotifyUser(event: ProcessedEvent, preferences: UserPreferences): boolean {
    // Check if user is monitoring this contract
    if (preferences.contracts.length > 0 && !preferences.contracts.includes(event.contractAddress)) {
      return false;
    }

    // Check if user is interested in this event type
    if (preferences.eventTypes.length > 0 && !preferences.eventTypes.includes(event.eventName)) {
      return false;
    }

    return true;
  }

  private meetsUrgencyLevel(eventUrgency: string, userThreshold: string): boolean {
    const urgencyLevels = { low: 1, medium: 2, high: 3 };
    return urgencyLevels[eventUrgency as keyof typeof urgencyLevels] >= 
           urgencyLevels[userThreshold as keyof typeof urgencyLevels];
  }

  private generateTitle(event: ProcessedEvent, analysis: AIAnalysis): string {
    const urgencyEmoji = this.getUrgencyEmoji(analysis.urgency);
    return `${urgencyEmoji} ${event.contractName}: ${event.eventName}`;
  }

  private generateMessage(
    event: ProcessedEvent,
    analysis: AIAnalysis,
    preferences: UserPreferences
  ): string {
    let message = analysis.userFriendlyMessage;

    // Add technical details if user wants them
    if (preferences.aiAnalysis) {
      message += `\n\n📊 Analysis:\n${analysis.summary}`;
      
      if (analysis.impact) {
        message += `\n\n💡 Impact: ${analysis.impact}`;
      }
      
      if (analysis.recommendations.length > 0) {
        message += `\n\n🎯 Recommendations:\n${analysis.recommendations.map(r => `• ${r}`).join('\n')}`;
      }
    }

    // Add blockchain details
    message += `\n\n🔗 Details:\n`;
    message += `• Contract: ${event.contractName}\n`;
    message += `• Block: ${event.blockNumber}\n`;
    message += `• Transaction: ${event.transactionHash.substring(0, 10)}...`;

    return message;
  }

  private determinePriority(urgency: string): 'low' | 'medium' | 'high' {
    return urgency as 'low' | 'medium' | 'high';
  }

  private getUrgencyEmoji(urgency: string): string {
    switch (urgency) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      case 'low': return 'ℹ️';
      default: return '📢';
    }
  }

  // Generate notification for multiple events
  generateBatchNotification(
    events: ProcessedEvent[],
    analyses: AIAnalysis[],
    userPreferences: UserPreferences
  ): NotificationMessage {
    const highUrgencyEvents = events.filter((_, index) => analyses[index].urgency === 'high');
    const mediumUrgencyEvents = events.filter((_, index) => analyses[index].urgency === 'medium');
    const lowUrgencyEvents = events.filter((_, index) => analyses[index].urgency === 'low');

    let title = '📊 Multiple Blockchain Events';
    let message = `You have ${events.length} new blockchain events:\n\n`;

    if (highUrgencyEvents.length > 0) {
      message += `🚨 High Priority (${highUrgencyEvents.length}):\n`;
      highUrgencyEvents.forEach(event => {
        message += `• ${event.contractName}: ${event.eventName}\n`;
      });
      message += '\n';
    }

    if (mediumUrgencyEvents.length > 0) {
      message += `⚠️ Medium Priority (${mediumUrgencyEvents.length}):\n`;
      mediumUrgencyEvents.forEach(event => {
        message += `• ${event.contractName}: ${event.eventName}\n`;
      });
      message += '\n';
    }

    if (lowUrgencyEvents.length > 0) {
      message += `ℹ️ Low Priority (${lowUrgencyEvents.length}):\n`;
      lowUrgencyEvents.forEach(event => {
        message += `• ${event.contractName}: ${event.eventName}\n`;
      });
    }

    return {
      title,
      message,
      priority: highUrgencyEvents.length > 0 ? 'high' : mediumUrgencyEvents.length > 0 ? 'medium' : 'low',
      channels: userPreferences.notificationMethods,
      data: {
        eventCount: events.length,
        highUrgencyCount: highUrgencyEvents.length,
        mediumUrgencyCount: mediumUrgencyEvents.length,
        lowUrgencyCount: lowUrgencyEvents.length
      }
    };
  }
}
