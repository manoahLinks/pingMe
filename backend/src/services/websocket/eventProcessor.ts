import { ethers } from 'ethers';

export interface ProcessedEvent {
  id: string;
  contractAddress: string;
  contractName: string;
  eventName: string;
  blockNumber: number;
  transactionHash: string;
  timestamp: number;
  data: any;
  parsedData?: any;
}

export class EventProcessor {
  async processEvent(eventInfo: {
    contractAddress: string;
    contractName: string;
    eventName: string;
    log: ethers.Log;
    contract: ethers.Contract;
  }): Promise<ProcessedEvent> {
    const { contractAddress, contractName, eventName, log, contract } = eventInfo;

    try {
      // Parse the log to extract event data
      const parsedLog = contract.interface.parseLog({
        topics: log.topics,
        data: log.data
      });

      // Get additional block information
      const provider = contract.runner?.provider;
      let timestamp = Math.floor(Date.now() / 1000);
      
      if (provider && 'getBlock' in provider) {
        try {
          const block = await (provider as any).getBlock(log.blockNumber);
          timestamp = block?.timestamp || timestamp;
        } catch (error) {
          console.warn('Failed to get block timestamp:', error);
        }
      }

      const processedEvent: ProcessedEvent = {
        id: `${log.transactionHash}-${log.index}`,
        contractAddress,
        contractName,
        eventName,
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
        timestamp,
        data: log,
        parsedData: parsedLog?.args
      };

      console.log(`📊 Processed event ${eventName}:`, {
        contract: contractName,
        block: log.blockNumber,
        tx: log.transactionHash,
        data: parsedLog?.args
      });

      return processedEvent;

    } catch (error) {
      console.error('❌ Error processing event:', error);
      
      // Return basic event info even if parsing fails
      return {
        id: `${log.transactionHash}-${log.index}`,
        contractAddress,
        contractName,
        eventName,
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
        timestamp: Math.floor(Date.now() / 1000),
        data: log
      };
    }
  }

  // Helper method to format event data for AI analysis
  formatEventForAI(event: ProcessedEvent): string {
    return `
Event: ${event.eventName}
Contract: ${event.contractName} (${event.contractAddress})
Block: ${event.blockNumber}
Transaction: ${event.transactionHash}
Timestamp: ${new Date(event.timestamp * 1000).toISOString()}
Data: ${JSON.stringify(event.parsedData || event.data, null, 2)}
    `.trim();
  }

  // Helper method to determine event importance
  getEventImportance(event: ProcessedEvent): 'low' | 'medium' | 'high' {
    const highImportanceEvents = [
      'Transfer',
      'Approval',
      'Swap',
      'LiquidityAdded',
      'LiquidityRemoved',
      'Sale',
      'BidPlaced',
      'ProposalCreated',
      'VoteCast'
    ];

    const mediumImportanceEvents = [
      'Deposit',
      'Withdrawal',
      'Stake',
      'Unstake',
      'Claim'
    ];

    if (highImportanceEvents.includes(event.eventName)) {
      return 'high';
    } else if (mediumImportanceEvents.includes(event.eventName)) {
      return 'medium';
    } else {
      return 'low';
    }
  }
}
