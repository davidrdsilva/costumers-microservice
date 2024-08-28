import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class BankingDetailsDto {
    @ApiProperty({ description: 'Agência.' })
    @IsString()
    @IsNotEmpty()
    agency: string;

    @ApiProperty({ description: 'Conta Corrente' })
    @IsString()
    @IsNotEmpty()
    checkingAccount: string;
}
