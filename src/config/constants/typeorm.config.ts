import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmAsyncConfig = <TypeOrmModuleAsyncOptions>{
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.main.host'),
        port: configService.get<number>('database.main.port'),
        username: configService.get<string>('database.main.username'),
        password: configService.get<string>('database.main.password'),
        database: configService.get<string>('database.main.database'),
        synchronize: configService.get<boolean>('database.main.synchronize'),
        entities: ['dist/**/*.entity.js', 'dist/**/*.view.js'],
        logging: ['info', 'query'],
    }),
    inject: [ConfigService],
};
