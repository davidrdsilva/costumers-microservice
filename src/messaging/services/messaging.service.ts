import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Injectable()
export class MessagingService implements OnModuleInit {
    private readonly logger = new Logger(MessagingService.name);

    onModuleInit() {
        this.logger.log('RabbitMQ Consumer Service Initialized');
    }

    // Define the pattern for consuming messages
    @EventPattern('transaction_created')
    async handleTransactionCreated(@Payload() data: any, @Ctx() context: RmqContext) {
        console.log('HIIIIIIIIIIIIII FROM CONSUMER');
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        try {
            // Handle the message (e.g., save to database, process data)
            this.logger.log(`Received transaction data: ${JSON.stringify(data)}`);

            // Acknowledge the message after processing
            channel.ack(originalMsg);
        } catch (error) {
            // Log error and optionally reject or requeue the message
            this.logger.error(`Error processing message: ${error.message}`);

            // Reject the message
            channel.nack(originalMsg, false, false);
        }
    }
}
