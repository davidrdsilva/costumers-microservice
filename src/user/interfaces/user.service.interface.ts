import { User } from '../entities/user.entity';

export interface UserServiceInterface {
    findById(userId: string): Promise<User>;
}
