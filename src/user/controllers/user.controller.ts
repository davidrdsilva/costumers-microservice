import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    Put,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.create(createUserDto);
    }

    @Get(':userId')
    @Roles(Role.User)
    @HttpCode(200)
    async findById(@Param('userId') userId: string): Promise<User> {
        return await this.userService.findById(userId);
    }

    @Patch(':userId')
    @Roles(Role.User)
    @ApiOperation({ summary: 'Atualizar um usuário pelo ID' })
    @ApiParam({ name: 'userId', description: 'ID do usuário.', type: 'string' })
    @ApiBody({ type: UpdateUserDto, description: 'Campos para atualizar o usuário.' })
    @ApiResponse({
        status: 200,
        description: 'As informações do usuário foram atualizadas.',
        type: User,
    })
    @ApiResponse({ status: 404, description: 'O usuário especificado não foi encontrado.' })
    async updateUser(
        @Req() req: Request,
        @Param('userId') userId: string,
        @Body() updateData: UpdateUserDto,
    ): Promise<User> {
        return this.userService.update(req, userId, updateData);
    }

    @Put('/profile-picture')
    @Roles(Role.User)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async updateProfilePicture(@Req() request: Request, @UploadedFile() file: Express.Multer.File) {
        return this.userService.updateUserImage(request, file);
    }
}
