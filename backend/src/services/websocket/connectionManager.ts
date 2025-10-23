export interface ConnectionManagerConfig {
  retryAttempts: number;
  retryDelay: number;
}

export class ConnectionManager {
  private config: ConnectionManagerConfig;
  private retryCount: number = 0;

  constructor(config: ConnectionManagerConfig) {
    this.config = config;
  }

  async handleConnectionError(error: any): Promise<void> {
    console.error('🔌 Connection error occurred:', error.message);
    
    if (this.retryCount < this.config.retryAttempts) {
      this.retryCount++;
      console.log(`🔄 Retrying connection (${this.retryCount}/${this.config.retryAttempts})...`);
      
      await this.delay(this.config.retryDelay);
    } else {
      console.error('❌ Max retry attempts reached. Connection failed.');
      throw new Error('Connection failed after maximum retry attempts');
    }
  }

  async reconnect(reconnectFunction: () => Promise<void>): Promise<void> {
    try {
      await reconnectFunction();
      this.retryCount = 0; // Reset retry count on successful reconnection
      console.log('✅ Successfully reconnected');
    } catch (error) {
      await this.handleConnectionError(error);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  resetRetryCount(): void {
    this.retryCount = 0;
  }

  getRetryCount(): number {
    return this.retryCount;
  }
}
