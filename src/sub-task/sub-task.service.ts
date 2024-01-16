import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { SubTask } from './entities/sub-task.entity';
import { Request } from 'express';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { UpdateSubTaskDto } from './dto/update-sub-tasks.dto';
import { GenericResponse } from 'src/interfaces/generic-response-interface';
import { Auth } from 'src/facades/auth';

@Injectable()
export class SubTaskService {
    constructor(
        private readonly authFacade: Auth,
        @InjectRepository(Task) private task: Repository<Task>,
        @InjectRepository(SubTask) private subTask: Repository<SubTask>
    ) { }

    async create(data: CreateSubTaskDto): Promise<SubTask> {
        const user = await this.authFacade.getUserLogged();
        const task = await this.task.findOne({
            where: {
                id: data.taskId,
                userId: user.id
            }
        });

        if (!task) {
            throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
        }

        const hasSubTask = !data.title ? null : await this.subTask.findOne({
            where: {
                title: data.title
            },
        });

        if (hasSubTask) {
            throw new HttpException('Already a exists sub task with this title', HttpStatus.NOT_FOUND);
        }

        const subTask = await this.subTask.save({
            ...data,
            task: task
        });

        return subTask;
    }

    async update(id: number, data: UpdateSubTaskDto): Promise<SubTask> {
        const user = await this.authFacade.getUserLogged();
        const subTask = await this.subTask.findOne({
            where: { id: id }
        });

        if (!subTask) {
            throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
        }

        if (!await this.task.findOne({
            where: {
                id: subTask.taskId,
                userId: user.id
            }
        })) {
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }


        const hasSubTask = !data.title ? null : await this.subTask.findOne({
            where: {
                title: data.title,
                id: Not(id)
            },
        });

        if (hasSubTask) {
            throw new HttpException('Already a exists sub task with this title', HttpStatus.NOT_FOUND);
        }

        delete data.taskId;

        await this.subTask.update(id, data);

        return await this.subTask.findOne({
            where: { id: id }
        });
    }

    async delete(id: number): Promise<GenericResponse> {
        const user = await this.authFacade.getUserLogged();
        const subTask = await this.subTask.findOne({
            where: {
                id: id
            },
        });

        if (!subTask) {
            throw new HttpException("Sub task not found", HttpStatus.NOT_FOUND);
        }

        if (!await this.task.findOne({
            where: {
                id: subTask.taskId,
                userId: user.id
            }
        })) {
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }


        await this.subTask.remove(subTask);

        return {
            message: "Sub task deleted"
        }
    }
}
