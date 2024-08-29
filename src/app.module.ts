import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/constants/general.config';
import { typeOrmAsyncConfig } from './config/constants/typeorm.config';
import { AuthModule } from './auth/modules/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { BullModule } from '@nestjs/bull';
import { bullAsyncConfig } from './config/constants/bull.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        BullModule.registerQueueAsync(bullAsyncConfig),
        AuthModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply to all routes
    }
}
