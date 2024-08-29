import {
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserServiceInterface } from '../interfaces/user.service.interface';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { BankingDetails } from '../entities/banking-details.entity';
import { Address } from '../entities/address.entity';
import { Role } from '../entities/role.entity';
import { StorageClientService } from './storage-client.service';

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(BankingDetails)
        private readonly bankingDetailsRepository: Repository<BankingDetails>,
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        private readonly dataSource: DataSource,
        private readonly storageClientService: StorageClientService,
    ) {}

    async create(userDto: CreateUserDto): Promise<User> {
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const newUser = this.userRepository.create(userDto);
            const newBankingDetails = this.bankingDetailsRepository.create(userDto.bankingDetails);
            const newAddresses = this.addressRepository.create(userDto.addresses);
            const newRoles = this.roleRepository.create(userDto.roles);

            // Save operations inside the transaction
            await queryRunner.manager.save(newBankingDetails);
            await queryRunner.manager.save(newAddresses);
            await queryRunner.manager.save(newRoles);

            newUser.bankingDetails = newBankingDetails;
            newUser.addresses = newAddresses;
            newUser.roles = newRoles;

            const savedUser = await queryRunner.manager.save(newUser);

            await queryRunner.commitTransaction();
            return savedUser;
        } catch (error) {
            // Rollback transaction in case of error
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Could not create user');
        } finally {
            // Release query runner to avoid memory leaks
            await queryRunner.release();
        }
    }

    async update(req: Request, userId: string, updateData: UpdateUserDto): Promise<User> {
        const loggedUser: User = req['user'];

        if (loggedUser.id !== userId) {
            throw new ForbiddenException("You can not perform this action on other user's profile.");
        }

        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const existingUser = await this.findById(userId);

            // Merge existing user with the provided fields to update
            const updatedBankingDetails = this.bankingDetailsRepository.merge(
                existingUser.bankingDetails,
                updateData.bankingDetails,
            );
            const updatedUser = this.userRepository.merge(existingUser, updateData);

            // Save baking details
            await queryRunner.manager.save(updatedBankingDetails);

            const result = await queryRunner.manager.save(updatedUser);

            await queryRunner.commitTransaction();
            return result;
        } catch (error) {
            // Rollback transaction in case of error
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Could not create user');
        } finally {
            // Release query runner to avoid memory leaks
            await queryRunner.release();
        }
    }

    async updateUserImage(req: Request, file: Express.Multer.File): Promise<{ status: string }> {
        const user: User = req['user'];

        try {
            const uploadedFile = await this.storageClientService.uploadFile(file);

            await this.userRepository.update(user.id, {
                userImage: uploadedFile.filename,
            });

            return { status: 'User image updated.' };
        } catch (error) {
            throw new InternalServerErrorException('Could not update the profile image. Check the log for details.');
        }
    }

    async findById(userId: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: { bankingDetails: true, addresses: true, roles: true },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({
            select: ['id', 'email', 'roles'],
            where: { email: email },
            relations: { roles: true },
        });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }
}
