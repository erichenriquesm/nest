import { Status } from 'src/enum/status.enum';
import { SubTask } from 'src/sub-task/entities/sub-task.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
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

  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  
  @OneToMany(() => SubTask, subTask => subTask.task)
  subTasks: SubTask[];
}