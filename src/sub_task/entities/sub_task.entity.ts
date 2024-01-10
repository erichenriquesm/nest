import { Task } from "src/task/entities/task.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

enum SubTaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

@Entity()
export class SubTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: SubTaskStatus,
    default: SubTaskStatus.PENDING
  })
  status: SubTaskStatus;

  @Column()
  taskId: number;

  @ManyToOne(() => Task, task => task.subTasks)
  @JoinColumn()
  task: Task;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
