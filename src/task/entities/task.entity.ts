import { SubTask } from 'src/sub_task/entities/sub_task.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

enum TaskStatus{
    PENDING = 'pending',
    COMPLETED = 'completed'
}

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
    enum: TaskStatus,
    default: TaskStatus.PENDING
  })
  status: TaskStatus;

  @Column({
    type: 'timestamp'
  })
  endDate: Date;

  @OneToMany(() => SubTask, subTask => subTask.task)
  subTasks: SubTask[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}