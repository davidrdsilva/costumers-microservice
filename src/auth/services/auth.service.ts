import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) {}

    async getUser(id: string) {
        const user = await this.usersService.findById(id);
        return user;
    }
}
