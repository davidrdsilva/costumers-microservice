import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get<number>('port');

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle('Transactions API')
        .setDescription('Documentação oficial do serviço de transações')
        .setVersion('1.0.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);

    Logger.log(`🚀 Server is running on: ${await app.getUrl()}`, 'API');
}
bootstrap();
