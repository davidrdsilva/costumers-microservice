import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Entity } from 'typeorm';

export class AddressDto {
    @ApiProperty({ description: 'Rua.' })
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiProperty({ description: 'Cidade ou município.' })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({ description: 'Estado.' })
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty({ description: 'País.' })
    @IsString()
    @IsNotEmpty()
    country: string;

    @ApiProperty({ description: 'CEP.' })
    @IsString()
    @IsNotEmpty()
    postalCode: string;

    @ApiProperty({ description: '(Opcional) Distrito.', required: false })
    @IsString()
    district?: string;
}

export class UpdateAddressDto {
    @ApiProperty({ description: 'Rua.', required: false })
    @IsOptional()
    @IsString()
    street?: string;

    @ApiProperty({ description: 'Cidade ou município.', required: false })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiProperty({ description: 'Estado.', required: false })
    @IsOptional()
    @IsString()
    state?: string;

    @ApiProperty({ description: 'País.', required: false })
    @IsOptional()
    @IsString()
    country?: string;

    @ApiProperty({ description: 'CEP.', required: false })
    @IsOptional()
    @IsString()
    postalCode?: string;

    @ApiProperty({ description: '(Opcional) Distrito.', required: false })
    @IsOptional()
    @IsString()
    district?: string;
}
