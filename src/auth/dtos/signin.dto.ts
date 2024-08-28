import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class SignInDto {
    @ApiProperty({ description: 'Email do usuário.' })
    @IsString()
    @IsNotEmpty()
    email: string;
}
