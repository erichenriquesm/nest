import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { SubTask } from './entities/sub-task.entity';
import { Request } from 'express';
import { CreateSubTaskDto } from './validators/create-sub-task';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { UpdateSubTaskDto } from './validators/update-sub-tasks.dto';
import { GenericResponse } from 'src/interfaces/generic-response-interface';

@Injectable()
export class SubTaskService {
    constructor(@InjectRepository(Task) private task:Repository<Task>,
        @InjectRepository(SubTask) private subTask:Repository<SubTask>
    ){}

    async create(data: CreateSubTaskDto): Promise<SubTask> {
        const task = await this.task.findOne({
            where: {id: data.taskId}
        });

        if(!task){
            throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
        }

        const hasSubTask = !data.title ? null : await this.subTask.findOne({
            where: {
                title: data.title
            },
        });

        if(hasSubTask){
            throw new HttpException('Already a exists sub task with this title', HttpStatus.NOT_FOUND);
        }

        const subTask = await this.subTask.save({
          ...data,
          task: task
        });
        
        return subTask;
    }

    async update(id: number, data: UpdateSubTaskDto) : Promise<SubTask> {
        const subTask = await this.subTask.findOne({
            where: {id: id}
        });

        if(!subTask){
            throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
        }

        const hasSubTask = !data.title ? null : await this.subTask.findOne({
            where: {
                title: data.title,
                id: Not(id)
            },
        });

        if(hasSubTask){
            throw new HttpException('Already a exists sub task with this title', HttpStatus.NOT_FOUND);
        }
        
        await this.subTask.update(id, data);
        
        return await this.subTask.findOne({
            where: {id: id}
        });
    }

    async delete(id: number) : Promise<GenericResponse> {
        const subTask = await this.subTask.findOne({
            where: {
               id: id
            },
        });

        if(!subTask){
            throw new HttpException("Sub task not found", HttpStatus.NOT_FOUND);
        }

        await this.subTask.remove(subTask);
        
        return {
            message: "Sub task deleted"
        }
    }
}
