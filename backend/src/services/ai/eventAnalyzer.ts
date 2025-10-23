import { GoogleGenAI } from "@google/genai";
import { ProcessedEvent } from '../websocket/eventProcessor';

export interface AIAnalysis {
  summary: string;
  impact: string;
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high';
  userFriendlyMessage: string;
}

export class EventAnalyzer {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({
      apiKey: apiKey
    });
  }

  async analyzeEvent(event: ProcessedEvent): Promise<AIAnalysis> {
    try {
      const eventDescription = this.formatEventForAnalysis(event);
      
      const prompt = `
You are an expert blockchain analyst. Analyze this smart contract event and provide insights:

${eventDescription}

Please provide:
1. A brief summary of what happened
2. The potential impact on users/investors
3. Any recommended actions
4. Rate the urgency (low/medium/high)
5. A user-friendly message explaining the event in simple terms

Format your response as JSON:
{
  "summary": "Brief description of the event",
  "impact": "How this affects users or the ecosystem",
  "recommendations": ["Action 1", "Action 2"],
  "urgency": "low|medium|high",
  "userFriendlyMessage": "Simple explanation for non-technical users"
}
      `;

      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      // Parse the AI response
      const analysis = this.parseAIResponse(response.text || '{}');
      
      console.log(`🤖 AI Analysis completed for ${event.eventName}:`, analysis);
      
      return analysis;

    } catch (error) {
      console.error('❌ Error in AI analysis:', error);
      
      // Return fallback analysis
      return this.getFallbackAnalysis(event);
    }
  }

  private formatEventForAnalysis(event: ProcessedEvent): string {
    return `
Event Details:
- Event Name: ${event.eventName}
- Contract: ${event.contractName} (${event.contractAddress})
- Block Number: ${event.blockNumber}
- Transaction: ${event.transactionHash}
- Timestamp: ${new Date(event.timestamp * 1000).toISOString()}
- Event Data: ${JSON.stringify(event.parsedData || event.data, null, 2)}
    `.trim();
  }

  private parseAIResponse(response: string): AIAnalysis {
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // If no JSON found, create a structured response
      return {
        summary: response.split('\n')[0] || 'Event occurred',
        impact: 'Impact analysis not available',
        recommendations: ['Monitor the situation'],
        urgency: 'medium',
        userFriendlyMessage: response
      };
    } catch (error) {
      console.error('❌ Error parsing AI response:', error);
      return this.getFallbackAnalysis();
    }
  }

  private getFallbackAnalysis(event?: ProcessedEvent): AIAnalysis {
    return {
      summary: event ? `${event.eventName} event occurred on ${event.contractName}` : 'Blockchain event occurred',
      impact: 'This event may have implications for the protocol or your holdings',
      recommendations: [
        'Monitor your portfolio',
        'Check for any related announcements',
        'Consider the market impact'
      ],
      urgency: 'medium',
      userFriendlyMessage: event 
        ? `A ${event.eventName} event just happened on the ${event.contractName} contract. This could be important for your investments.`
        : 'A blockchain event occurred that might be relevant to your portfolio.'
    };
  }

  // Batch analysis for multiple events
  async analyzeMultipleEvents(events: ProcessedEvent[]): Promise<AIAnalysis[]> {
    const analyses: AIAnalysis[] = [];
    
    for (const event of events) {
      try {
        const analysis = await this.analyzeEvent(event);
        analyses.push(analysis);
        
        // Add delay to avoid rate limiting
        await this.delay(1000);
      } catch (error) {
        console.error(`❌ Error analyzing event ${event.id}:`, error);
        analyses.push(this.getFallbackAnalysis(event));
      }
    }
    
    return analyses;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
