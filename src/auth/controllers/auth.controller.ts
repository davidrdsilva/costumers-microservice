import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dtos/signin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    @HttpCode(200)
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto.email);
    }
}
