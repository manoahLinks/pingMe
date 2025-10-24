# Blockchain Event Notification Service

A backend service that listens to blockchain events based on user subscriptions stored in a smart contract.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp env.example .env
```

3. Update `.env` with your configuration:
```
PORT=3000
SUBSCRIPTION_CONTRACT_ADDRESS=0x...

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
```

4. Add contract ABIs to the `contractABIs.json` file

5. Start the service:
```bash
node index.js
```

## API Endpoints

- `GET /` - Service status
- `GET /subscriptions` - Fetch active subscriptions from smart contract
- `GET /listeners` - Get active event listeners
- `POST /refresh` - Manually refresh event listeners
- `GET /abis` - Get all contract addresses with ABIs
- `GET /abis/:contractAddress` - Get events for a specific contract
- `GET /abis/:contractAddress/:eventName` - Get specific event ABI
- `POST /reload-abis` - Reload ABIs from JSON file
- `POST /test-email` - Send test email notification

## How it works

1. Service fetches active subscriptions from the smart contract
2. Sets up WebSocket listeners for each subscription
3. When events occur, logs the parsed event data
4. Refreshes subscriptions every 5 minutes

## Adding Contract ABIs

Add your contract ABIs to the `contractABIs.json` file:

```json
{
  "0xContractAddress": {
    "EventName": {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "name": "param1", "type": "address"},
        {"indexed": false, "name": "param2", "type": "uint256"}
      ],
      "name": "EventName",
      "type": "event"
    }
  }
}
```

After updating the JSON file, call `POST /reload-abis` to reload the ABIs without restarting the service.
