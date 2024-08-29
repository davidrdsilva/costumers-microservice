import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

export interface UserServiceInterface {
    create(userDto: CreateUserDto): Promise<User>;
    findById(userId: string): Promise<User>;
    update(req: Request, userId: string, userDto: UpdateUserDto): Promise<User>;
    updateUserImage(ureq: Request, file: any): Promise<{ status: string }>;
    findByEmail(email: string): Promise<User>;
    addUserToQueue(user: Partial<User>): Promise<void>;
    getUserFromQueue(email: string): Promise<void>;
}
