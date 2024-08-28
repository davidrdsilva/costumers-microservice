import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class BankingDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 30})
    agency: string;

    @Column({name: 'checking_account', length: 30})
    checkingAccount: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
