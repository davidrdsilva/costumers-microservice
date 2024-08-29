import { Module } from '@nestjs/common';
import { MessagingController } from '../controllers/messaging.controller';

@Module({
    controllers: [MessagingController],
})
export class MessagingModule {}
