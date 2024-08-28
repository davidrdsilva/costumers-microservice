import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import { BankingDetails } from './banking-details.entity';
import { Address } from './address.entity';
import { Role } from './role.entity';

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name', length: 50 })
    firstName: string;

    @Column({ name: 'last_name', length: 80 })
    lastName: string;

    @Column({ length: 60 })
    email: string;

    @Column({ name: 'user_image', length: 70 })
    userImage: string;

    @OneToOne(() => BankingDetails, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'banking_details_id' })
    bankingDetails: BankingDetails;

    @OneToMany(() => Address, (address) => address.user)
    addresses: Address[];

    @OneToMany(() => Role, (role) => role.user)
    roles: Role[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
