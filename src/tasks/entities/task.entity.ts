import { SubTaskEntity } from 'src/sub_tasks/entities/sub_task.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

enum TaskStatus{
    PENDING = 'pending',
    COMPLETED = 'completed'
}

@Entity()
export class TaskEntity {
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

  @OneToMany(() => SubTaskEntity, subTask => subTask.task)
  subTasks: SubTaskEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}