const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = null;
        this.initializeTransporter();
    }

    initializeTransporter() {
        try {
            this.transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                secure: true,
                port: 465,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                debug: true
            });
            console.log('Email service initialized with privateemail.com');
        } catch (error) {
            console.error('Failed to initialize email service:', error);
        }
    }

    async sendEventNotification(userEmail, eventData) {
        try {
            const { subscription, event } = eventData;
            
            const subject = `🔔 Blockchain Event Alert - ${event.eventName}`;
            const htmlContent = this.generateEmailHTML(subscription, event);

            const info = await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: userEmail,
                subject: subject,
                html: htmlContent
            }, (err, sent) => {
                err ? console.log('Error sending email:', err) : console.log('Successfully sent:', sent);
            });

            console.log(`Email sent successfully to ${userEmail}:`, info.messageId);
            return { success: true, messageId: info.messageId };
            
        } catch (error) {
            console.error('Failed to send email:', error);
            return { success: false, error: error.message };
        }
    }

    // Helper function to safely serialize data with BigInt handling
    safeStringify(obj, space = 2) {
        return JSON.stringify(obj, (key, value) => {
            if (typeof value === 'bigint') {
                return value.toString();
            }
            return value;
        }, space);
    }

    generateEmailHTML(subscription, event) {
        const timestamp = new Date(event.timestamp * 1000).toLocaleString();
        
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
                .event-details { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 10px 0; }
                .event-data { background: #e8f4fd; padding: 10px; border-radius: 3px; margin: 10px 0; }
                .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
                .highlight { color: #0066cc; font-weight: bold; }
                .tx-link { color: #0066cc; text-decoration: none; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>🔔 Blockchain Event Alert</h2>
                    <p>You're receiving this notification because you subscribed to blockchain events.</p>
                </div>
                
                <div class="event-details">
                    <h3>Event Details</h3>
                    <p><strong>Event:</strong> <span class="highlight">${event.eventName}</span></p>
                    <p><strong>Contract:</strong> ${subscription.contractAddress}</p>
                    <p><strong>Block:</strong> ${event.blockNumber}</p>
                    <p><strong>Transaction:</strong> <a href="https://explorer.somnia.network/tx/${event.transactionHash}" class="tx-link">${event.transactionHash}</a></p>
                    <p><strong>Time:</strong> ${timestamp}</p>
                </div>
                
                <div class="event-data">
                    <h4>Event Data</h4>
                    <pre>${this.safeStringify(event.parsedData, 2)}</pre>
                </div>
                
                <div class="footer">
                    <p>This notification was sent by PingMe Blockchain Event Service.</p>
                    <p>To unsubscribe, please visit your subscription management page.</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    generateEmailText(subscription, event) {
        const timestamp = new Date(event.timestamp * 1000).toLocaleString();
        
        return `
BLOCKCHAIN EVENT ALERT

Event: ${event.eventName}
Contract: ${subscription.contractAddress}
Block: ${event.blockNumber}
Transaction: ${event.transactionHash}
Time: ${timestamp}

Event Data:
${this.safeStringify(event.parsedData, 2)}

---
This notification was sent by PingMe Blockchain Event Service.
To unsubscribe, please visit your subscription management page.
        `;
    }

    async testConnection() {
        try {
            await this.transporter.verify();
            console.log('Email service connection verified');
            return true;
        } catch (error) {
            console.error('Email service connection failed:', error);
            return false;
        }
    }
}

module.exports = EmailService;
