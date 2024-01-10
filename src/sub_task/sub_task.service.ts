import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SubTask } from './entities/sub_task.entity';
import { Request } from 'express';
import { CreateSubTaskDto } from './validators/create.sub.task';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';

@Injectable()
export class SubTaskService {
    constructor(@InjectRepository(Task) private task:Repository<Task>,
        @InjectRepository(SubTask) private sub_task:Repository<SubTask>
    ){}

    async create(data: CreateSubTaskDto): Promise<SubTask> {
        const task = await this.task.findOne({
            where: {id: data.taskId}
        });

        if(!task){
            throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
        }

        const sub_task = await this.sub_task.save({
          ...data,
          task: task
        });
        
        return sub_task;
    }
}
