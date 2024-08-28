import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

export interface UserServiceInterface {
    create(userDto: CreateUserDto): Promise<User>;
    findById(userId: string): Promise<User>;
    update(req: Request, userId: string, userDto: UpdateUserDto): Promise<User>;
    updateUserImage(userImage: string): Promise<{ status: string }>;
    findByEmail(email: string): Promise<User>;
}
