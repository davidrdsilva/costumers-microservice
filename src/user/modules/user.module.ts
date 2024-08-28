import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { BankingDetails } from '../entities/banking-details.entity';
import { Address } from '../entities/address.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, BankingDetails, Address])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
