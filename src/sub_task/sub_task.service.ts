import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { SubTask } from './entities/sub_task.entity';
import { Request } from 'express';
import { CreateSubTaskDto } from './validators/create-sub-task';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { UpdateSubTaskDto } from './validators/update-sub-tasks.dto';
import { GenericResponse } from 'src/interfaces/generic.response.interface';

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

        const has_sub_task = !data.title ? null : await this.sub_task.findOne({
            where: {
                title: data.title
            },
        });

        if(has_sub_task){
            throw new HttpException('Already a exists sub task with this title', HttpStatus.NOT_FOUND);
        }

        const sub_task = await this.sub_task.save({
          ...data,
          task: task
        });
        
        return sub_task;
    }

    async update(id: number, data: UpdateSubTaskDto) : Promise<SubTask> {
        const sub_task = await this.sub_task.findOne({
            where: {id: id}
        });

        if(!sub_task){
            throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
        }

        const has_sub_task = !data.title ? null : await this.sub_task.findOne({
            where: {
                title: data.title,
                id: Not(id)
            },
        });

        if(has_sub_task){
            throw new HttpException('Already a exists sub task with this title', HttpStatus.NOT_FOUND);
        }
        
        await this.sub_task.update(id, data);
        
        return await this.sub_task.findOne({
            where: {id: id}
        });
    }

    async delete(id: number) : Promise<GenericResponse> {
        const sub_task = await this.sub_task.findOne({
            where: {
               id: id
            },
        });

        if(!sub_task){
            throw new HttpException("Sub task not found", HttpStatus.NOT_FOUND);
        }

        await this.sub_task.remove(sub_task);
        
        return {
            message: "Sub task deleted"
        }
    }
}
