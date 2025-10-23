import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";
import { SomniaWebSocketService } from './services/websocket/somniaWebSocketService';
// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

const ai = new GoogleGenAI({
  apiKey: 'AIzaSyDyZI8uGFzuHn2M-a3hq5AxOzKkkRQaHZ0',
});

// Initialize Somnia WebSocket Service
const somniaWebSocketService = new SomniaWebSocketService({
  somnia: {
    wsUrl: process.env.SOMNIA_WS_URL || 'wss://dream-rpc.somnia.network/ws',
    contractAddress: '0xf11Aa91C0AfbDE19064396c06ae3EDd4150C2693',
    contractName: 'Counter',
    events: ['NumberSet', 'NumberIncremented'],
    abi: [
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "uint256", name: "oldNumber", type: "uint256" },
          { indexed: true, internalType: "uint256", name: "newNumber", type: "uint256" },
        ],
        name: "NumberSet",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: "uint256", name: "oldNumber", type: "uint256" },
          { indexed: true, internalType: "uint256", name: "newNumber", type: "uint256" },
        ],
        name: "NumberIncremented",
        type: "event",
      },
    ],
    retryAttempts: 5,
    retryDelay: 5000,
    healthCheckInterval: 30000
  },
  ai: {
    apiKey: 'AIzaSyDyZI8uGFzuHn2M-a3hq5AxOzKkkRQaHZ0'
  },
  notifications: {
    email: {
      from: 'noreply@pingme.com',
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUser: 'your-email@gmail.com',
      smtpPassword: 'your-app-password'
    },
    sms: {
      apiKey: 'your-twilio-api-key',
      apiSecret: 'your-twilio-api-secret',
      fromNumber: '+1234567890'
    },
    push: {
      vapidKeys: {
        publicKey: 'your-vapid-public-key',
        privateKey: 'your-vapid-private-key'
      },
      subject: 'mailto:admin@pingme.com'
    }
  },
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/pingme'
  }
});


// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to PingMe Backend API',
    version: '1.0.0',
    status: 'running'
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// WebSocket Service Management
app.get('/api/somnia/status', (req: Request, res: Response) => {
  const status = somniaWebSocketService.getStatus();
  res.json({
    success: true,
    data: status
  });
});

app.post('/api/somnia/start', async (req: Request, res: Response) => {
  try {
    await somniaWebSocketService.start();
    res.json({
      success: true,
      message: 'Somnia WebSocket service started successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to start Somnia WebSocket service',
      message: error.message
    });
  }
});

app.post('/api/somnia/stop', async (req: Request, res: Response) => {
  try {
    await somniaWebSocketService.stop();
    res.json({
      success: true,
      message: 'Somnia WebSocket service stopped successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to stop Somnia WebSocket service',
      message: error.message
    });
  }
});

// OpenAI API endpoint
app.post('/api/openai/chat', async (req: Request, res: Response) => {
  try {
    const { message, model = 'gpt-3.5-turbo', max_tokens = 1000 } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Message is required'
      });
    }

    const completion =  await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    return res.json({
      success: true,
      response: completion?.text || 'No response generated',
    });

  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    
    if (error.status === 401) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid OpenAI API key'
      });
    }
    
    if (error.status === 429) {
      return res.status(429).json({
        error: 'Rate Limited',
        message: 'OpenAI API rate limit exceeded'
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to process OpenAI request'
    });
  }
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

export default app;
