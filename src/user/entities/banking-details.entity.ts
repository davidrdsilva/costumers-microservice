import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@Unique(['agency', 'checkingAccount'])
export class BankingDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 30 })
    agency: string;

    @Column({ name: 'checking_account', length: 30 })
    checkingAccount: string;

    @OneToOne(() => User, (user) => user.bankingDetails, { onDelete: 'CASCADE' })
    user: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
