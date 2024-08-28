import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AddressDto, UpdateAddressDto } from './address.dto';
import { BankingDetailsDto, UpdateBankingDetailsDto } from './banking-details.dto';
import { Role } from 'src/auth/enums/role.enum';

export class RoleDto {
    @ApiProperty({
        description: 'Nome da role (admin, user, guest)',
        enum: Role,
    })
    name: Role;
}

export class CreateUserDto {
    @ApiProperty({
        description: 'Nome do usuário. Máximo de 50 caracteres.',
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'Sobrenome do usuário. Máximo de 80 caracteres.',
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'Endereço de e-mail do usuário. Máximo de 60 caracteres.',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Nome do arquivo de imagem do usuário. Máximo de 70 caracteres.',
        required: false,
    })
    @IsString()
    userImage?: string;

    @ApiProperty({
        description: 'Detalhes bancários do usuário.',
        type: BankingDetailsDto,
    })
    @ValidateNested()
    @Type(() => BankingDetailsDto)
    bankingDetails: BankingDetailsDto;

    @ApiProperty({
        description: 'Lista de endereços associados ao usuário.',
        type: [AddressDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    addresses: AddressDto[];

    @ApiProperty({
        description: 'Role do usuário. Máximo de 10 caracteres.',
        type: [RoleDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RoleDto)
    roles: RoleDto[];
}

export class UpdateUserDto {
    @ApiProperty({
        description: 'Nome do usuário. Máximo de 50 caracteres.',
        required: false,
    })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty({
        description: 'Sobrenome do usuário. Máximo de 80 caracteres.',
        required: false,
    })
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiProperty({
        description: 'Nome do arquivo de imagem do usuário. Máximo de 70 caracteres.',
        required: false,
    })
    @IsOptional()
    @IsString()
    userImage?: string;

    @ApiProperty({
        description: 'Detalhes bancários do usuário.',
        required: false,
        type: UpdateBankingDetailsDto,
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateBankingDetailsDto)
    bankingDetails?: UpdateBankingDetailsDto;
}
