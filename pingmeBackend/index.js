require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ethers = require('ethers');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const wsUrl = 'wss://dream-rpc.somnia.network/ws';
const provider = new ethers.WebSocketProvider(wsUrl);

// Monitor WebSocket connection status
provider.on('debug', (info) => {
    console.log('WebSocket debug:', info);
});

provider.on('error', (error) => {
    console.error('❌ WebSocket error:', error);
});

// Subscription contract configuration
const SUBSCRIPTION_CONTRACT_ADDRESS = process.env.SUBSCRIPTION_CONTRACT_ADDRESS;
const subscriptionABI = [
    {
        "inputs": [],
        "name": "getActiveSubscriptions",
        "outputs": [
            {
                "components": [
                    {"internalType": "address", "name": "user", "type": "address"},
                    {"internalType": "address", "name": "contractAddress", "type": "address"},
                    {"internalType": "string", "name": "eventName", "type": "string"},
                    {"internalType": "string", "name": "email", "type": "string"},
                    {"internalType": "bool", "name": "isActive", "type": "bool"},
                    {"internalType": "uint256", "name": "createdAt", "type": "uint256"}
                ],
                "internalType": "struct NotificationSubscriptions.Subscription[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const subscriptionContract = new ethers.Contract(SUBSCRIPTION_CONTRACT_ADDRESS, subscriptionABI, provider);

// Load contract ABIs from JSON file
let contractABIs = {};
try {
    const abiPath = path.join(__dirname, 'contractABIs.json');
    const abiData = fs.readFileSync(abiPath, 'utf8');
    contractABIs = JSON.parse(abiData);
    console.log(`Loaded ABIs for ${Object.keys(contractABIs).length} contracts`);
} catch (error) {
    console.error('Error loading contract ABIs:', error);
    contractABIs = {};
}

// Active event listeners storage
const activeListeners = new Map();

// Get event ABI by contract address and event name
function getEventABI(contractAddress, eventName) {
    try {
        const contractABI = contractABIs[contractAddress];
        if (!contractABI) {
            console.warn(`No ABI found for contract ${contractAddress}`);
            return null;
        }
        
        const eventABI = contractABI[eventName];
        if (!eventABI) {
            console.warn(`No ABI found for event ${eventName} on contract ${contractAddress}`);
            return null;
        }
        
        return eventABI;
    } catch (error) {
        console.error('Error getting event ABI:', error);
        return null;
    }
}

// Fetch active subscriptions from smart contract
async function fetchActiveSubscriptions() {
    try {
        const subscriptions = await subscriptionContract.getActiveSubscriptions();
        console.log(`Fetched ${subscriptions.length} active subscriptions`);
        return subscriptions;
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        return [];
    }
}

// Setup event listener for a subscription
function setupEventListener(subscription) {
    const { contractAddress, eventName, email } = subscription;
    
    console.log(`Setting up listener for: ${eventName} on ${contractAddress}`);
    
    // Get event ABI for this subscription
    const eventABI = getEventABI(contractAddress, eventName);
    if (!eventABI) {
        console.warn(`No ABI found for event ${eventName} on contract ${contractAddress}`);
        return;
    }
    
    console.log(`Found ABI for ${eventName}:`, JSON.stringify(eventABI, null, 2));
    
    // Create contract interface with the specific event ABI
    const contractInterface = new ethers.Interface([eventABI]);
    
    // Build the exact event signature from ABI
    const inputs = eventABI.inputs.map(input => input.type).join(',');
    const eventSignature = `${eventName}(${inputs})`;
    console.log(`Event signature: ${eventSignature}`);
    
    // Create filter for this specific event
    const filter = {
        address: contractAddress,
        topics: [ethers.id(eventSignature)]
    };
    
    console.log(`Filter created:`, filter);
    
    // Set up event listener
    const listener = async (log) => {
        try {
            // Parse the event log
            const parsedLog = contractInterface.parseLog({
                topics: log.topics,
                data: log.data
            });
            
            console.log('Event detected:', {
                subscription: {
                    contractAddress,
                    eventName,
                    email
                },
                event: {
                    blockNumber: log.blockNumber,
                    transactionHash: log.transactionHash,
                    parsedData: parsedLog.args
                }
            });
            
        } catch (error) {
            console.error('Error parsing event log:', error);
        }
    };
    
    // Add listener to provider
    provider.on(filter, listener);
    
    // Store listener info for cleanup
    const listenerKey = `${contractAddress}-${eventName}`;
    activeListeners.set(listenerKey, { filter, listener });
    
    console.log(`Event listener set up for ${eventName} on ${contractAddress}`);
}

// Remove event listener
function removeEventListener(contractAddress, eventName) {
    const listenerKey = `${contractAddress}-${eventName}`;
    const listenerInfo = activeListeners.get(listenerKey);
    
    if (listenerInfo) {
        provider.off(listenerInfo.filter, listenerInfo.listener);
        activeListeners.delete(listenerKey);
        console.log(`Event listener removed for ${eventName} on ${contractAddress}`);
    }
}

// Setup all event listeners based on active subscriptions
async function setupEventListeners() {
    try {
        // Clear existing listeners
        for (const [key, listenerInfo] of activeListeners) {
            provider.off(listenerInfo.filter, listenerInfo.listener);
        }
        activeListeners.clear();
        
        // Fetch active subscriptions
        const subscriptions = await fetchActiveSubscriptions();
        
        // Setup listeners for each subscription
        for (const subscription of subscriptions) {
            setupEventListener(subscription);
        }
        
        console.log(`Setup complete: ${activeListeners.size} event listeners active`);
        
    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
}

// Refresh subscriptions periodically
setInterval(async () => {
    console.log('Refreshing subscriptions...');
    await setupEventListeners();
}, 300000); // Every 5 minutes


// API endpoints
app.get('/', (req, res) => {
    res.json({
        status: 'running',
        service: 'Blockchain Event Notification Service',
        activeListeners: activeListeners.size
    });
});

app.get('/subscriptions', async (req, res) => {
    try {
        const subscriptions = await fetchActiveSubscriptions();
        res.json({
            success: true,
            count: subscriptions.length,
            subscriptions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/listeners', (req, res) => {
    const listeners = Array.from(activeListeners.keys()).map(key => {
        const [contractAddress, eventName] = key.split('-');
        return { contractAddress, eventName };
    });
    
    res.json({
        success: true,
        count: activeListeners.size,
        listeners
    });
});

app.post('/refresh', async (req, res) => {
    try {
        await setupEventListeners();
        res.json({
            success: true,
            message: 'Event listeners refreshed',
            activeListeners: activeListeners.size
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/abis', (req, res) => {
    try {
        res.json({
            success: true,
            contracts: Object.keys(contractABIs),
            totalContracts: Object.keys(contractABIs).length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/abis/:contractAddress', (req, res) => {
    try {
        const { contractAddress } = req.params;
        const contractABI = contractABIs[contractAddress];
        
        if (!contractABI) {
            return res.status(404).json({
                success: false,
                error: 'Contract ABI not found'
            });
        }
        
        res.json({
            success: true,
            contractAddress,
            events: Object.keys(contractABI),
            totalEvents: Object.keys(contractABI).length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/abis/:contractAddress/:eventName', (req, res) => {
    try {
        const { contractAddress, eventName } = req.params;
        const eventABI = getEventABI(contractAddress, eventName);
        
        if (!eventABI) {
            return res.status(404).json({
                success: false,
                error: 'Event ABI not found'
            });
        }
        
        res.json({
            success: true,
            contractAddress,
            eventName,
            abi: eventABI
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.post('/reload-abis', (req, res) => {
    try {
        // Reload ABIs from JSON file
        const abiPath = path.join(__dirname, 'contractABIs.json');
        const abiData = fs.readFileSync(abiPath, 'utf8');
        contractABIs = JSON.parse(abiData);
        
        res.json({
            success: true,
            message: 'ABIs reloaded successfully',
            totalContracts: Object.keys(contractABIs).length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.post('/test-listener', (req, res) => {
    try {
        const { contractAddress, eventName } = req.body;
        
        if (!contractAddress || !eventName) {
            return res.status(400).json({
                success: false,
                error: 'contractAddress and eventName are required'
            });
        }
        
        // Create a test listener
        const eventABI = getEventABI(contractAddress, eventName);
        if (!eventABI) {
            return res.status(404).json({
                success: false,
                error: 'Event ABI not found'
            });
        }
        
        const inputs = eventABI.inputs.map(input => input.type).join(',');
        const eventSignature = `${eventName}(${inputs})`;
        
        const testFilter = {
            address: contractAddress,
            topics: [ethers.id(eventSignature)]
        };
        
        console.log(`Setting up test listener for ${eventSignature}`);
        console.log('Test filter:', testFilter);
        
        const testListener = (log) => {
            console.log('🔥 TEST LISTENER TRIGGERED!', {
                blockNumber: log.blockNumber,
                transactionHash: log.transactionHash,
                topics: log.topics,
                data: log.data
            });
        };
        
        provider.on(testFilter, testListener);
        
        // Remove test listener after 30 seconds
        setTimeout(() => {
            provider.off(testFilter, testListener);
            console.log('Test listener removed');
        }, 30000);
        
        res.json({
            success: true,
            message: 'Test listener set up for 30 seconds',
            eventSignature,
            filter: testFilter
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Initialize the service
async function initialize() {
    try {
        console.log('Initializing blockchain event notification service...');
        console.log(`Subscription contract: ${SUBSCRIPTION_CONTRACT_ADDRESS}`);
        
        // Test WebSocket connection by making a simple call
        console.log('Testing WebSocket connection...');
        try {
            const blockNumber = await provider.getBlockNumber();
            console.log(`✅ WebSocket connected, current block: ${blockNumber}`);
        } catch (error) {
            console.error('❌ WebSocket connection failed:', error);
            throw error;
        }
        
        console.log('Setting up event listeners...');
        await setupEventListeners();
        
        console.log('Service initialized successfully');
    } catch (error) {
        console.error('Failed to initialize service:', error);
        process.exit(1);
    }
}

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    initialize();
});