import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Entity } from 'typeorm';

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

export class UpdateBankingDetailsDto {
    @ApiProperty({ description: 'Agência.', required: false })
    @IsOptional()
    @IsString()
    agency?: string;

    @ApiProperty({ description: 'Conta Corrente', required: false })
    @IsOptional()
    @IsString()
    checkingAccount?: string;
}
