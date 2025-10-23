#!/usr/bin/env node

/**
 * Test Somnia WebSocket Listener
 * 
 * This script demonstrates how to use the Somnia WebSocket listener
 * following the official Somnia documentation pattern.
 * 
 * Usage:
 *   node test-somnia-listener.js
 * 
 * Make sure to have a contract deployed on Somnia testnet
 * and update the contract address below.
 */

const { ethers } = require("ethers");

// Configuration - Update these values
const wsUrl = "wss://dream-rpc.somnia.network/ws"; // Somnia Testnet WebSocket
const contractAddress = "0xADA7b2953E7d670092644d37b6a39BAE3237beD7"; // Your contract address

// Contract ABI - Update based on your contract
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
    inputs: [],
    name: "getGreeting",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
];

class SomniaListener {
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
      console.log("🚀 Starting Somnia WebSocket Listener...");
      console.log(`📡 Connecting to: ${this.wsUrl}`);
      console.log(`📋 Contract: ${this.contractAddress}`);
      
      await this.connect();
      await this.setupEventListeners();
      this.startHealthMonitoring();
      
      console.log("✅ Somnia WebSocket Listener started successfully");
      console.log("👂 Listening for events... Press Ctrl+C to stop");
      
    } catch (error) {
      console.error("❌ Failed to start listener:", error.message);
      await this.handleConnectionError(error);
    }
  }

  async connect() {
    try {
      // Create WebSocket provider
      this.provider = new ethers.WebSocketProvider(this.wsUrl);
      await this.provider._waitUntilReady();
      
      // Create contract instance
      this.contract = new ethers.Contract(this.contractAddress, this.abi, this.provider);
      
      console.log("✅ Connected to Somnia WebSocket");
      console.log("✅ Contract instance created");
      
    } catch (error) {
      console.error("❌ Connection failed:", error.message);
      throw error;
    }
  }

  async setupEventListeners() {
    if (!this.provider || !this.contract) {
      throw new Error("Provider or contract not initialized");
    }

    console.log("🔧 Setting up event listeners...");

    // Event filter for GreetingSet
    const filter = {
      address: this.contractAddress,
      topics: [ethers.id("GreetingSet(string,string)")],
    };

    // Listen for GreetingSet events
    this.provider.on(filter, async (log) => {
      try {
        console.log("🔔 GreetingSet event detected!");
        await this.handleGreetingSetEvent(log);
      } catch (error) {
        console.error("❌ Error handling GreetingSet event:", error.message);
      }
    });

    console.log("👂 Listening for GreetingSet events");
  }

  async handleGreetingSetEvent(log) {
    console.log(`📊 Event details:`, {
      blockNumber: log.blockNumber,
      transactionHash: log.transactionHash,
      logIndex: log.index
    });

    // Parse the log to extract event data
    const parsedLog = this.contract.interface.parseLog({
      topics: log.topics,
      data: log.data
    });

    if (parsedLog) {
      console.log(`📝 Old greeting: "${parsedLog.args.oldGreeting}"`);
      console.log(`📝 New greeting: "${parsedLog.args.newGreeting}"`);
    }

    // Get current greeting from contract
    try {
      const currentGreeting = await this.contract.getGreeting();
      console.log(`💬 Current greeting: "${currentGreeting}"`);
    } catch (error) {
      console.log("ℹ️ Could not retrieve current greeting");
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
    console.log("🛑 Stopping Somnia WebSocket Listener...");
    
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
    
    if (this.provider) {
      this.provider.destroy();
    }
    
    console.log("✅ Somnia WebSocket Listener stopped");
  }
}

// Main execution
async function main() {
  const listener = new SomniaListener({
    wsUrl,
    contractAddress,
    abi
  });

  // Handle shutdown gracefully
  process.on("SIGINT", async () => {
    console.log("\n🛑 Shutting down...");
    await listener.stop();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    console.log("\n🛑 Shutting down...");
    await listener.stop();
    process.exit(0);
  });

  await listener.start();
}

// Run the listener
main().catch(console.error);
