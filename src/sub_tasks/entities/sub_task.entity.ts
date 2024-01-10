import { TaskEntity } from "src/tasks/entities/task.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

enum SubTaskStatus{
    PENDING = 'pending',
    COMPLETED = 'completed'
}

@Entity()
export class SubTaskEntity {
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
  
    @ManyToOne(() => TaskEntity, task => task.subTasks)
    @JoinColumn({ name: 'taskId' })
    task: TaskEntity;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
