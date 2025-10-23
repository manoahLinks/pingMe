import { ethers } from 'ethers';
import { EventProcessor } from './eventProcessor';
import { ConnectionManager } from './connectionManager';

export interface ContractConfig {
  address: string;
  name: string;
  events: string[];
  abi: any[];
}

export interface SomniaListenerConfig {
  wsUrl: string;
  contracts: ContractConfig[];
  retryAttempts?: number;
  retryDelay?: number;
}

export class SomniaListener {
  private provider: ethers.WebSocketProvider | null = null;
  private contracts: Map<string, ethers.Contract> = new Map();
  private eventProcessor: EventProcessor;
  private connectionManager: ConnectionManager;
  private isConnected: boolean = false;
  private config: SomniaListenerConfig;

  constructor(config: SomniaListenerConfig) {
    this.config = config;
    this.eventProcessor = new EventProcessor();
    this.connectionManager = new ConnectionManager({
      retryAttempts: config.retryAttempts || 5,
      retryDelay: config.retryDelay || 5000
    });
  }

  async start(): Promise<void> {
    try {
      console.log('🚀 Starting Somnia WebSocket Listener...');
      
      // Initialize WebSocket provider
      this.provider = new ethers.WebSocketProvider(this.config.wsUrl);
      await this.provider._waitUntilReady();
      
      console.log('✅ Connected to Somnia WebSocket');
      this.isConnected = true;

      // Initialize contracts
      await this.initializeContracts();

      // Set up event listeners
      this.setupEventListeners();

      // Start connection health monitoring
      this.startHealthMonitoring();

      console.log('🎯 Listening for events on contracts:', this.config.contracts.map(c => c.name));

    } catch (error) {
      console.error('❌ Failed to start Somnia listener:', error);
      await this.connectionManager.handleConnectionError(error);
    }
  }

  private async initializeContracts(): Promise<void> {
    for (const contractConfig of this.config.contracts) {
      try {
        const contract = new ethers.Contract(
          contractConfig.address,
          contractConfig.abi,
          this.provider!
        );
        
        this.contracts.set(contractConfig.address, contract);
        console.log(`📋 Initialized contract: ${contractConfig.name} at ${contractConfig.address}`);
      } catch (error) {
        console.error(`❌ Failed to initialize contract ${contractConfig.name}:`, error);
      }
    }
  }

  private setupEventListeners(): void {
    for (const contractConfig of this.config.contracts) {
      const contract = this.contracts.get(contractConfig.address);
      if (!contract) continue;

      for (const eventName of contractConfig.events) {
        try {
          // Create event filter
          const filter = {
            address: contractConfig.address,
            topics: [ethers.id(`${eventName}(...)`)]
          };

          // Set up event listener
          this.provider!.on(filter, async (log) => {
            try {
              console.log(`🔔 Event detected: ${eventName} from ${contractConfig.name}`);
              
              // Process the event
              const eventData = await this.eventProcessor.processEvent({
                contractAddress: contractConfig.address,
                contractName: contractConfig.name,
                eventName,
                log,
                contract
              });

              // Emit processed event for further handling
              this.emitEvent(eventData);

            } catch (error) {
              console.error(`❌ Error processing event ${eventName}:`, error);
            }
          });

          console.log(`👂 Listening for ${eventName} events from ${contractConfig.name}`);

        } catch (error) {
          console.error(`❌ Failed to set up listener for ${eventName}:`, error);
        }
      }
    }
  }

  private startHealthMonitoring(): void {
    setInterval(async () => {
      if (!this.isConnected || !this.provider) return;

      try {
        await this.provider.getBlockNumber();
        console.log('💓 Connection health check passed');
      } catch (error) {
        console.error('💔 Connection health check failed:', error);
        await this.handleConnectionLoss();
      }
    }, 30000); // Check every 30 seconds
  }

  private async handleConnectionLoss(): Promise<void> {
    console.log('🔄 Connection lost, attempting to reconnect...');
    this.isConnected = false;
    
    try {
      await this.connectionManager.reconnect(async () => {
        await this.start();
      });
    } catch (error) {
      console.error('❌ Failed to reconnect:', error);
    }
  }

  private emitEvent(eventData: any): void {
    // This will be handled by the main application
    console.log('📤 Emitting processed event:', eventData);
    // TODO: Integrate with notification system
  }

  async stop(): Promise<void> {
    console.log('🛑 Stopping Somnia WebSocket Listener...');
    
    if (this.provider) {
      this.provider.destroy();
      this.provider = null;
    }
    
    this.isConnected = false;
    console.log('✅ Somnia listener stopped');
  }

  getStatus(): { connected: boolean; contracts: string[] } {
    return {
      connected: this.isConnected,
      contracts: Array.from(this.contracts.keys())
    };
  }
}
