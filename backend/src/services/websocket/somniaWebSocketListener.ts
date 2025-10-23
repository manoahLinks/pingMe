import { ethers } from 'ethers';

export interface SomniaWebSocketConfig {
  wsUrl: string;
  contractAddress: string;
  contractName: string;
  abi: any[];
  events: string[];
  retryAttempts?: number;
  retryDelay?: number;
  healthCheckInterval?: number;
}

export interface EventHandler {
  (log: ethers.Log, contract: ethers.Contract): Promise<void>;
}

export class SomniaWebSocketListener {
  private provider: ethers.WebSocketProvider | null = null;
  private contract: ethers.Contract | null = null;
  private config: SomniaWebSocketConfig;
  private isConnected: boolean = false;
  private retryCount: number = 0;
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private eventHandlers: Map<string, EventHandler> = new Map();

  constructor(config: SomniaWebSocketConfig) {
    this.config = {
      retryAttempts: 5,
      retryDelay: 5000,
      healthCheckInterval: 30000,
      ...config
    };
  }

  async start(): Promise<void> {
    try {
      console.log('🚀 Starting Somnia WebSocket Listener...');
      console.log(`📡 Connecting to: ${this.config.wsUrl}`);
      console.log(`📋 Contract: ${this.config.contractName} at ${this.config.contractAddress}`);
      console.log(`👂 Listening for events: ${this.config.events.join(', ')}`);

      await this.connect();
      await this.setupEventListeners();
      this.startHealthMonitoring();

      this.isConnected = true;
      console.log('✅ Somnia WebSocket Listener started successfully');

    } catch (error) {
      console.error('❌ Failed to start Somnia WebSocket Listener:', error);
      await this.handleConnectionError(error);
    }
  }

  private async connect(): Promise<void> {
    try {
      // Create WebSocket provider
      this.provider = new ethers.WebSocketProvider(this.config.wsUrl);
      await this.provider._waitUntilReady();
      
      // Create contract instance
      this.contract = new ethers.Contract(
        this.config.contractAddress,
        this.config.abi,
        this.provider
      );

      console.log('✅ Connected to Somnia WebSocket');
      console.log('✅ Contract instance created');

    } catch (error) {
      console.error('❌ Failed to connect to Somnia WebSocket:', error);
      throw error;
    }
  }

  private async setupEventListeners(): Promise<void> {
    if (!this.provider || !this.contract) {
      throw new Error('Provider or contract not initialized');
    }

    console.log('🔧 Setting up event listeners...');

    for (const eventName of this.config.events) {
      try {
        // Create event filter
        const filter = {
          address: this.config.contractAddress,
          topics: [ethers.id(`${eventName}(...)`)]
        };

        // Set up event listener
        this.provider.on(filter, async (log) => {
          try {
            console.log(`🔔 Event detected: ${eventName} from ${this.config.contractName}`);
            
            // Call custom event handler if registered
            const handler = this.eventHandlers.get(eventName);
            if (handler) {
              await handler(log, this.contract!);
            } else {
              // Default event handling
              await this.defaultEventHandler(log, eventName);
            }

          } catch (error) {
            console.error(`❌ Error processing event ${eventName}:`, error);
          }
        });

        console.log(`👂 Listening for ${eventName} events from ${this.config.contractName}`);

      } catch (error) {
        console.error(`❌ Failed to set up listener for ${eventName}:`, error);
      }
    }
  }

  private async defaultEventHandler(log: ethers.Log, eventName: string): Promise<void> {
    try {
      // Parse the log to extract event data
      const parsedLog = this.contract!.interface.parseLog({
        topics: log.topics,
        data: log.data
      });

      console.log(`📊 Event ${eventName} details:`, {
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
        logIndex: log.index,
        args: parsedLog?.args
      });

      // Try to get current contract state if possible
      try {
        const currentState = await this.getCurrentContractState();
        console.log(`📈 Current contract state:`, currentState);
      } catch (error) {
        console.log('ℹ️ Could not retrieve current contract state');
      }

    } catch (error) {
      console.error('❌ Error in default event handler:', error);
    }
  }

  private async getCurrentContractState(): Promise<any> {
    if (!this.contract) return null;

    try {
      // Try to call common read functions
      const state: any = {};
      
      // Try to get greeting if it's a greeting contract
      try {
        const greeting = await this.contract.getGreeting();
        state.greeting = greeting;
      } catch (error) {
        // Function doesn't exist, skip
      }

      // Try to get other common functions
      try {
        const owner = await this.contract.owner();
        state.owner = owner;
      } catch (error) {
        // Function doesn't exist, skip
      }

      return state;
    } catch (error) {
      throw error;
    }
  }

  private startHealthMonitoring(): void {
    if (!this.provider) return;

    this.healthCheckInterval = setInterval(async () => {
      try {
        await this.provider!.getBlockNumber();
        console.log('💓 Connection health check passed');
      } catch (error) {
        console.error('💔 Connection health check failed:', error);
        await this.handleConnectionLoss();
      }
    }, this.config.healthCheckInterval);
  }

  private async handleConnectionLoss(): Promise<void> {
    console.log('🔄 Connection lost, attempting to reconnect...');
    this.isConnected = false;
    
    try {
      await this.reconnect();
    } catch (error) {
      console.error('❌ Failed to reconnect:', error);
    }
  }

  private async reconnect(): Promise<void> {
    if (this.retryCount >= this.config.retryAttempts!) {
      console.error('❌ Max retry attempts reached. Connection failed.');
      throw new Error('Max retry attempts reached');
    }

    this.retryCount++;
    console.log(`🔄 Retrying connection (${this.retryCount}/${this.config.retryAttempts})...`);
    
    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
    
    try {
      await this.connect();
      await this.setupEventListeners();
      this.isConnected = true;
      this.retryCount = 0; // Reset retry count on successful reconnection
      console.log('✅ Successfully reconnected');
    } catch (error) {
      await this.reconnect();
    }
  }

  private async handleConnectionError(error: any): Promise<void> {
    console.error('🔌 Connection error occurred:', error.message);
    
    if (this.retryCount < this.config.retryAttempts!) {
      this.retryCount++;
      console.log(`🔄 Retrying connection (${this.retryCount}/${this.config.retryAttempts})...`);
      
      await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
      await this.start();
    } else {
      console.error('❌ Max retry attempts reached. Connection failed.');
      throw new Error('Connection failed after maximum retry attempts');
    }
  }

  // Register custom event handler
  registerEventHandler(eventName: string, handler: EventHandler): void {
    this.eventHandlers.set(eventName, handler);
    console.log(`📝 Registered custom handler for ${eventName}`);
  }

  // Get recent events on startup
  async loadEventHistory(blockRange: number = 100): Promise<void> {
    if (!this.contract || !this.provider) {
      console.log('⚠️ Cannot load event history: contract or provider not initialized');
      return;
    }

    try {
      console.log(`📚 Loading event history for last ${blockRange} blocks...`);
      
      const currentBlock = await this.provider.getBlockNumber();
      const startBlock = Math.max(0, currentBlock - blockRange);

      for (const eventName of this.config.events) {
        try {
          const events = await this.contract.queryFilter(eventName, startBlock, currentBlock);
          console.log(`📜 Found ${events.length} historical ${eventName} events`);
          
          // Process historical events
          for (const event of events) {
            console.log(`📜 Historical event ${eventName}:`, {
              blockNumber: event.blockNumber,
              transactionHash: event.transactionHash,
              args: (event as any).args || 'No args available'
            });
          }
        } catch (error) {
          console.error(`❌ Error loading history for ${eventName}:`, error);
        }
      }
    } catch (error) {
      console.error('❌ Error loading event history:', error);
    }
  }

  async stop(): Promise<void> {
    console.log('🛑 Stopping Somnia WebSocket Listener...');
    
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
    
    if (this.provider) {
      this.provider.destroy();
      this.provider = null;
    }
    
    this.contract = null;
    this.isConnected = false;
    this.eventHandlers.clear();
    
    console.log('✅ Somnia WebSocket Listener stopped');
  }

  getStatus(): { connected: boolean; contractAddress: string; events: string[]; retryCount: number } {
    return {
      connected: this.isConnected,
      contractAddress: this.config.contractAddress,
      events: this.config.events,
      retryCount: this.retryCount
    };
  }
}
