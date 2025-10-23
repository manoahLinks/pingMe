# PingMe Backend - Real-time Blockchain Event Monitoring with AI

A comprehensive backend service that monitors blockchain events in real-time using WebSocket connections and provides AI-powered notifications to users based on their preferences.

## 🚀 Features

- **Real-time WebSocket Monitoring**: Listen to Somnia blockchain events in real-time
- **AI-Powered Analysis**: Use Google Gemini AI to analyze and explain blockchain events
- **Multi-channel Notifications**: Email, SMS, and Push notifications
- **User Preference Management**: Granular control over what events to monitor
- **MongoDB Integration**: Store user preferences, event history, and notification logs
- **Smart Filtering**: Only notify users about events they care about
- **Quiet Hours**: Respect user's quiet time preferences
- **Batch Notifications**: Group multiple events into single notifications

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Somnia        │    │   WebSocket       │    │   AI Analysis   │
│   Blockchain    │───▶│   Listener       │───▶│   Service       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │   Event          │    │   Notification  │
                       │   Processor      │    │   Generator     │
                       └──────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │   MongoDB        │    │   Notification  │
                       │   Database       │    │   Manager       │
                       └──────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │   Email/SMS/    │
                                               │   Push Services │
                                               └─────────────────┘
```

## 📦 Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/pingme
   OPENAI_API_KEY=your-google-ai-api-key
   ```

3. **Start MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or install MongoDB locally
   ```

4. **Build and Run**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build
   npm start
   ```

## 🔧 Configuration

### WebSocket Service Configuration

The WebSocket service can be configured in `src/app.ts`:

```typescript
const websocketService = new WebSocketService({
  somnia: {
    wsUrl: 'wss://dream-rpc.somnia.network/ws', // Somnia WebSocket URL
    contracts: [
      {
        address: '0x...', // Contract address
        name: 'Contract Name',
        events: ['EventName1', 'EventName2'], // Events to monitor
        abi: [...] // Contract ABI
      }
    ],
    retryAttempts: 5,
    retryDelay: 5000
  },
  // ... other configuration
});
```

### Notification Services

Configure email, SMS, and push notification services:

```typescript
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
}
```

## 📡 API Endpoints

### WebSocket Service Management

- `GET /api/websocket/status` - Get WebSocket service status
- `POST /api/websocket/start` - Start WebSocket monitoring
- `POST /api/websocket/stop` - Stop WebSocket monitoring

### AI Chat

- `POST /api/openai/chat` - Chat with AI service

### Health Check

- `GET /health` - Service health status
- `GET /` - API information

## 🗄️ Database Models

### User
```typescript
{
  _id: string;
  email: string;
  phone?: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### UserPreferences
```typescript
{
  userId: string;
  contracts: string[]; // Contract addresses to monitor
  eventTypes: string[]; // Event names to track
  notificationMethods: ('email' | 'sms' | 'push')[];
  aiAnalysis: boolean;
  urgencyLevel: 'low' | 'medium' | 'high';
  language: string;
  timezone: string;
  quietHours: {
    enabled: boolean;
    start: string; // HH:MM format
    end: string;   // HH:MM format
    timezone: string;
  };
  batchNotifications: boolean;
  maxNotificationsPerHour: number;
}
```

### BlockchainEvent
```typescript
{
  eventId: string;
  contractAddress: string;
  contractName: string;
  eventName: string;
  blockNumber: number;
  transactionHash: string;
  timestamp: number;
  data: any; // Raw event data
  parsedData: any; // Parsed event arguments
  importance: 'low' | 'medium' | 'high';
  processed: boolean;
}
```

### NotificationHistory
```typescript
{
  userId: string;
  eventId: string;
  notificationType: 'email' | 'sms' | 'push';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  sentAt: Date;
  delivered: boolean;
  errorMessage?: string;
}
```

## 🔄 Event Flow

1. **WebSocket Connection**: Connects to Somnia blockchain WebSocket
2. **Event Detection**: Listens for specific smart contract events
3. **Event Processing**: Parses event data and determines importance
4. **User Filtering**: Finds users interested in the event
5. **AI Analysis**: Analyzes event with Google Gemini AI
6. **Notification Generation**: Creates user-friendly messages
7. **Delivery**: Sends notifications via email, SMS, or push
8. **Logging**: Records notification history in database

## 🎯 Use Cases

### DeFi Monitoring
- Monitor DEX swaps and liquidity changes
- Track yield farming activities
- Alert on significant price movements

### NFT Tracking
- Monitor NFT sales and transfers
- Track collection value changes
- Alert on marketplace activities

### DAO Governance
- Track proposal creation and voting
- Monitor treasury changes
- Alert on governance activities

### Trading Alerts
- Monitor whale movements
- Track large transactions
- Alert on market anomalies

## 🛠️ Development

### Project Structure
```
src/
├── models/                 # MongoDB models
├── services/
│   ├── websocket/         # WebSocket services
│   ├── ai/               # AI analysis services
│   ├── notifications/    # Notification services
│   ├── user/            # User management
│   └── database/        # Database services
├── types/               # TypeScript type definitions
├── app.ts              # Main application
└── server.ts           # Server startup
```

### Adding New Contracts

1. Add contract configuration to WebSocket service
2. Define contract ABI with events you want to monitor
3. Update user preferences to include new contract
4. Test event detection and processing

### Adding New Notification Channels

1. Create new notification service in `src/services/notifications/`
2. Implement the service interface
3. Add to NotificationManager
4. Update user preferences to include new channel

## 🚨 Error Handling

The system includes comprehensive error handling:

- **Connection Retry**: Automatic reconnection on WebSocket failures
- **Database Resilience**: Handles MongoDB connection issues
- **Notification Fallbacks**: Graceful degradation when services fail
- **Rate Limiting**: Prevents notification spam
- **Quiet Hours**: Respects user preferences

## 📊 Monitoring

Monitor the system using:

- **Health Endpoints**: Check service status
- **Database Queries**: Monitor event processing
- **Notification Logs**: Track delivery success rates
- **WebSocket Status**: Monitor connection health

## 🔒 Security

- **Input Validation**: All inputs are validated
- **Rate Limiting**: Prevents abuse
- **Secure Headers**: Helmet.js security headers
- **Environment Variables**: Sensitive data in environment
- **Database Indexing**: Optimized queries

## 🚀 Deployment

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/pingme
OPENAI_API_KEY=your-api-key
```

## 📈 Performance

- **Connection Pooling**: Efficient database connections
- **Event Batching**: Group multiple events for efficiency
- **Caching**: Cache user preferences and settings
- **Indexing**: Optimized database queries
- **Async Processing**: Non-blocking event processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API endpoints
- Monitor the health endpoints

---

**PingMe Backend** - Real-time blockchain event monitoring with AI-powered notifications! 🚀
