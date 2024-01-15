import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    emailVerifiedAt: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date
}
