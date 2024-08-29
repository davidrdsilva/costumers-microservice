import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get<number>('port');

    // Use Transport
    const queues = ['transaction_queue'];

    for (const queue of queues) {
        app.connectMicroservice({
            transport: Transport.RMQ,
            options: {
                urls: [configService.get<string>('microservices.rabbitMqUrl')],
                queue: queue,
                noAck: false,
                queueOptions: {
                    durable: true,
                },
            },
        });
    }

    await app.startAllMicroservices();

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle('Transactions API')
        .setDescription('Documentação oficial do serviço de transações')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);

    Logger.log(`🚀 Server is running on: ${await app.getUrl()}`, 'API');
}
bootstrap();
