import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { BankingDetails } from '../entities/banking-details.entity';
import { Address } from '../entities/address.entity';
import { Role } from '../entities/role.entity';
import { StorageClientService } from '../services/storage-client.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, BankingDetails, Address, Role])],
    controllers: [UserController],
    providers: [UserService, StorageClientService],
    exports: [UserService],
})
export class UserModule {}
