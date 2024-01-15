import { Status } from 'src/enum/status.enum';
import { SubTask } from 'src/sub-task/entities/sub-task.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'text',
    nullable: true
  })
  description: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING
  })
  status: Status;

  @Column({
    type: 'timestamp'
  })
  endDate: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.tasks, {onDelete: 'CASCADE'})
  @JoinColumn()
  user:User;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  
  @OneToMany(() => SubTask, subTask => subTask.task)
  subTasks: SubTask[];
}