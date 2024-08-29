import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserController } from '../controllers/user.controller';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    const mockUser: User = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        userImage: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        bankingDetails: null,
        addresses: [],
        roles: [],
    };

    const mockCreateUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        userImage: '',
        bankingDetails: { agency: '123', checkingAccount: '456' },
        addresses: [],
        roles: [],
    };

    const mockUpdateUserDto: UpdateUserDto = {
        firstName: 'Jane',
    };

    const mockUserService = {
        create: jest.fn().mockResolvedValue(mockUser),
        findById: jest.fn().mockResolvedValue(mockUser),
        update: jest.fn().mockResolvedValue({ ...mockUser, firstName: 'Jane' }),
        updateUserImage: jest.fn().mockResolvedValue({ status: 'User image updated.' }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(RolesGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a user', async () => {
            const result = await controller.create(mockCreateUserDto);
            expect(result).toEqual(mockUser);
            expect(service.create).toHaveBeenCalledWith(mockCreateUserDto);
        });
    });

    describe('findById', () => {
        it('should find a user by id', async () => {
            const result = await controller.findById('1');
            expect(result).toEqual(mockUser);
            expect(service.findById).toHaveBeenCalledWith('1');
        });

        it('should throw NotFoundException if user is not found', async () => {
            jest.spyOn(service, 'findById').mockRejectedValue(new NotFoundException('User not found'));

            await expect(controller.findById('1')).rejects.toThrow(NotFoundException);
        });
    });

    describe('updateUser', () => {
        it('should update a user', async () => {
            const mockRequest = { user: mockUser } as any;
            const result = await controller.updateUser(mockRequest, '1', mockUpdateUserDto);
            expect(result.firstName).toEqual('Jane');
            expect(service.update).toHaveBeenCalledWith(mockRequest, '1', mockUpdateUserDto);
        });

        it('should throw ForbiddenException if user tries to update another user', async () => {
            const mockRequest = { user: { id: '2' } } as any;

            jest.spyOn(service, 'update').mockRejectedValue(new ForbiddenException("You can't perform this action."));

            await expect(controller.updateUser(mockRequest, '1', mockUpdateUserDto)).rejects.toThrow(
                ForbiddenException,
            );
        });
    });

    describe('updateProfilePicture', () => {
        it('should update the profile picture', async () => {
            const mockFile = { originalname: 'test.png' } as Express.Multer.File;
            const mockRequest = { user: mockUser } as any;

            const result = await controller.updateProfilePicture(mockRequest, mockFile);
            expect(result).toEqual({ status: 'User image updated.' });
            expect(service.updateUserImage).toHaveBeenCalledWith(mockRequest, mockFile);
        });
    });
});
