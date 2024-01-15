import { Exclude } from "class-transformer";
import { Task } from "src/task/entities/task.entity";
import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"

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

    @OneToMany(() => Task, Task => Task.userId)
    tasks: Task[];

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date
}
