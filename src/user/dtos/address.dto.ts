import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
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
