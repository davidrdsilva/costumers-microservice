import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsString, ValidateNested } from 'class-validator';
import { AddressDto } from './address.dto';
import { BankingDetailsDto } from './banking-details.dto';

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
}

export class UpdateUserDto {
    @ApiProperty({
        description: 'Nome do usuário. Máximo de 50 caracteres.',
    })
    @IsString()
    firstName?: string;

    @ApiProperty({
        description: 'Sobrenome do usuário. Máximo de 80 caracteres.',
    })
    @IsString()
    lastName?: string;

    @ApiProperty({
        description: 'Endereço de e-mail do usuário. Máximo de 60 caracteres.',
    })
    @IsEmail()
    email?: string;

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
    bankingDetails?: BankingDetailsDto;

    @ApiProperty({
        description: 'Lista de endereços associados ao usuário.',
        type: [AddressDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    addresses?: AddressDto[];
}
