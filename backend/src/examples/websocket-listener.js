// Somnia WebSocket Event Listener Example
// Based on Somnia documentation: https://docs.somnia.network/websocket-events

const { ethers } = require("ethers");

// Configuration
const wsUrl = "wss://dream-rpc.somnia.network/ws"; // Somnia Testnet WebSocket
const contractAddress = "0xADA7b2953E7d670092644d37b6a39BAE3237beD7"; // Replace with your contract address

// Contract ABI
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

async function listen() {
  try {
    console.log("🚀 Starting Somnia WebSocket Listener...");
    console.log(`📡 Connecting to: ${wsUrl}`);
    console.log(`📋 Contract: ${contractAddress}`);
    
    // Create WebSocket provider and contract
    const provider = new ethers.WebSocketProvider(wsUrl);
    await provider._waitUntilReady();
    const contract = new ethers.Contract(contractAddress, abi, provider);

    console.log("✅ Connected to Somnia WebSocket");
    console.log("✅ Contract instance created");
    console.log("Listening for events...\n");

    // Event filter
    const filter = {
      address: contractAddress,
      topics: [ethers.id("GreetingSet(string,string)")],
    };

    // Listen for events
    provider.on(filter, async (log) => {
      try {
        console.log("🔔 GreetingSet event detected!");
        console.log(`📊 Event details:`, {
          blockNumber: log.blockNumber,
          transactionHash: log.transactionHash,
          logIndex: log.index
        });

        // Parse the log to extract event data
        const parsedLog = contract.interface.parseLog({
          topics: log.topics,
          data: log.data
        });

        if (parsedLog) {
          console.log(`📝 Event args:`, parsedLog.args);
        }

        // Get current greeting from contract
        const greeting = await contract.getGreeting();
        console.log(`💬 New greeting: "${greeting}"`);
        console.log("---");

      } catch (error) {
        console.error("❌ Error processing event:", error.message);
      }
    });

    // Keep connection alive
    setInterval(async () => {
      try {
        await provider.getBlockNumber();
        console.log("💓 Connection health check passed");
      } catch (error) {
        console.error("💔 Connection health check failed:", error.message);
      }
    }, 30000);

    // Handle shutdown
    process.on("SIGINT", () => {
      console.log("\n🛑 Shutting down...");
      provider.destroy();
      process.exit(0);
    });

    console.log("✅ WebSocket listener is running. Press Ctrl+C to stop.");

  } catch (error) {
    console.error("❌ Failed to start listener:", error.message);
    process.exit(1);
  }
}

// Start listening
listen().catch(console.error);
