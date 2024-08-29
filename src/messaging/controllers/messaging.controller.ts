import { Controller, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class MessagingController {
    private readonly logger = new Logger(MessagingController.name);

    // Define the pattern for consuming messages
    @MessagePattern('transaction_created')
    async handleTransactionCreated(@Payload() data: any, @Ctx() context: RmqContext) {
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
