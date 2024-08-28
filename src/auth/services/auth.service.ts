import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string) {
        const user = await this.usersService.findByEmail(email);
        const payload = { sub: user.email };

        return {
            accessToken: await this.jwtService.signAsync(payload),
            user: user,
        };
    }

    async getUser(id: string) {
        const user = await this.usersService.findById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
