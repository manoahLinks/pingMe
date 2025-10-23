// Advanced Somnia WebSocket Event Listener
// Demonstrates multiple events, error recovery, and event history

const { ethers } = require("ethers");

// Configuration
const wsUrl = "wss://dream-rpc.somnia.network/ws";
const contractAddress = "0xADA7b2953E7d670092644d37b6a39BAE3237beD7";

// Extended ABI with multiple events
const abi = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "string", name: "oldGreeting", type: "string" },
      { indexed: true, internalType: "string", name: "newGreeting", type: "string" },
    ],
    name: "GreetingSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "string", name: "message", type: "string" },
    ],
    name: "UserMessage",
    type: "event",
  },
  {
    inputs: [],
    name: "getGreeting",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMessageCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

class AdvancedSomniaListener {
  constructor(config) {
    this.wsUrl = config.wsUrl;
    this.contractAddress = config.contractAddress;
    this.abi = config.abi;
    this.provider = null;
    this.contract = null;
    this.retryCount = 0;
    this.maxRetries = 5;
    this.retryDelay = 5000;
    this.healthCheckInterval = null;
  }

  async start() {
    try {
      console.log("🚀 Starting Advanced Somnia WebSocket Listener...");
      await this.connect();
      await this.loadEventHistory();
      await this.setupEventListeners();
      this.startHealthMonitoring();
      console.log("✅ Advanced listener started successfully");
    } catch (error) {
      console.error("❌ Failed to start listener:", error.message);
      await this.handleConnectionError(error);
    }
  }

  async connect() {
    try {
      console.log(`📡 Connecting to: ${this.wsUrl}`);
      this.provider = new ethers.WebSocketProvider(this.wsUrl);
      await this.provider._waitUntilReady();
      this.contract = new ethers.Contract(this.contractAddress, this.abi, this.provider);
      console.log("✅ Connected to Somnia WebSocket");
    } catch (error) {
      console.error("❌ Connection failed:", error.message);
      throw error;
    }
  }

  async loadEventHistory(blockRange = 100) {
    if (!this.contract || !this.provider) return;

    try {
      console.log(`📚 Loading event history for last ${blockRange} blocks...`);
      const currentBlock = await this.provider.getBlockNumber();
      const startBlock = Math.max(0, currentBlock - blockRange);

      // Load GreetingSet events
      const greetingEvents = await this.contract.queryFilter("GreetingSet", startBlock, currentBlock);
      console.log(`📜 Found ${greetingEvents.length} historical GreetingSet events`);

      // Load UserMessage events
      const messageEvents = await this.contract.queryFilter("UserMessage", startBlock, currentBlock);
      console.log(`📜 Found ${messageEvents.length} historical UserMessage events`);

      // Process historical events
      for (const event of greetingEvents) {
        console.log(`📜 Historical GreetingSet:`, {
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
          args: event.args
        });
      }

      for (const event of messageEvents) {
        console.log(`📜 Historical UserMessage:`, {
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
          args: event.args
        });
      }

    } catch (error) {
      console.error("❌ Error loading event history:", error.message);
    }
  }

  async setupEventListeners() {
    if (!this.provider || !this.contract) {
      throw new Error("Provider or contract not initialized");
    }

    console.log("🔧 Setting up event listeners...");

    // Listen for GreetingSet events
    const greetingFilter = {
      address: this.contractAddress,
      topics: [ethers.id("GreetingSet(string,string)")],
    };

    this.provider.on(greetingFilter, async (log) => {
      try {
        console.log("🔔 GreetingSet event detected!");
        await this.handleGreetingSetEvent(log);
      } catch (error) {
        console.error("❌ Error handling GreetingSet event:", error.message);
      }
    });

    // Listen for UserMessage events
    const messageFilter = {
      address: this.contractAddress,
      topics: [ethers.id("UserMessage(address,string)")],
    };

    this.provider.on(messageFilter, async (log) => {
      try {
        console.log("🔔 UserMessage event detected!");
        await this.handleUserMessageEvent(log);
      } catch (error) {
        console.error("❌ Error handling UserMessage event:", error.message);
      }
    });

    console.log("👂 Listening for GreetingSet and UserMessage events");
  }

  async handleGreetingSetEvent(log) {
    console.log(`📊 GreetingSet details:`, {
      blockNumber: log.blockNumber,
      transactionHash: log.transactionHash,
      logIndex: log.index
    });

    // Parse the log
    const parsedLog = this.contract.interface.parseLog({
      topics: log.topics,
      data: log.data
    });

    if (parsedLog) {
      console.log(`📝 Old greeting: "${parsedLog.args.oldGreeting}"`);
      console.log(`📝 New greeting: "${parsedLog.args.newGreeting}"`);
    }

    // Get current greeting
    try {
      const currentGreeting = await this.contract.getGreeting();
      console.log(`💬 Current greeting: "${currentGreeting}"`);
    } catch (error) {
      console.log("ℹ️ Could not retrieve current greeting");
    }

    console.log("---");
  }

  async handleUserMessageEvent(log) {
    console.log(`📊 UserMessage details:`, {
      blockNumber: log.blockNumber,
      transactionHash: log.transactionHash,
      logIndex: log.index
    });

    // Parse the log
    const parsedLog = this.contract.interface.parseLog({
      topics: log.topics,
      data: log.data
    });

    if (parsedLog) {
      console.log(`👤 User: ${parsedLog.args.user}`);
      console.log(`💬 Message: "${parsedLog.args.message}"`);
    }

    // Get message count
    try {
      const messageCount = await this.contract.getMessageCount();
      console.log(`📊 Total messages: ${messageCount.toString()}`);
    } catch (error) {
      console.log("ℹ️ Could not retrieve message count");
    }

    console.log("---");
  }

  startHealthMonitoring() {
    this.healthCheckInterval = setInterval(async () => {
      try {
        await this.provider.getBlockNumber();
        console.log("💓 Connection health check passed");
      } catch (error) {
        console.error("💔 Connection health check failed:", error.message);
        await this.handleConnectionLoss();
      }
    }, 30000);
  }

  async handleConnectionLoss() {
    console.log("🔄 Connection lost, attempting to reconnect...");
    await this.reconnect();
  }

  async reconnect() {
    if (this.retryCount >= this.maxRetries) {
      console.error("❌ Max retry attempts reached. Connection failed.");
      return;
    }

    this.retryCount++;
    console.log(`🔄 Retrying connection (${this.retryCount}/${this.maxRetries})...`);
    
    await new Promise(resolve => setTimeout(resolve, this.retryDelay));
    
    try {
      await this.connect();
      await this.setupEventListeners();
      this.retryCount = 0;
      console.log("✅ Successfully reconnected");
    } catch (error) {
      await this.reconnect();
    }
  }

  async handleConnectionError(error) {
    console.error("🔌 Connection error occurred:", error.message);
    
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      console.log(`🔄 Retrying connection (${this.retryCount}/${this.maxRetries})...`);
      
      await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      await this.start();
    } else {
      console.error("❌ Max retry attempts reached. Connection failed.");
      process.exit(1);
    }
  }

  async stop() {
    console.log("🛑 Stopping Advanced Somnia WebSocket Listener...");
    
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
    
    if (this.provider) {
      this.provider.destroy();
    }
    
    console.log("✅ Advanced listener stopped");
  }
}

// Usage
async function main() {
  const listener = new AdvancedSomniaListener({
    wsUrl,
    contractAddress,
    abi
  });

  // Handle shutdown
  process.on("SIGINT", async () => {
    console.log("\n🛑 Shutting down...");
    await listener.stop();
    process.exit(0);
  });

  await listener.start();
  console.log("✅ Advanced WebSocket listener is running. Press Ctrl+C to stop.");
}

// Start the listener
main().catch(console.error);
