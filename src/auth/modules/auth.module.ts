import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/modules/user.module';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from '../services/auth.service';
import { JwtStrategy } from '../services/jwt.strategy';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('api.jwtSecret'),
                signOptions: { expiresIn: '2 days' },
                global: true,
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy],
})
export class AuthModule {}
