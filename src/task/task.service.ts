import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Pagination } from 'src/interfaces/pagination.interface';
import { GenericResponse } from 'src/interfaces/generic.response.interface';
import { CreateTaskDto } from 'src/task/validators/create-task';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    readonly task: Repository<Task>
  ) { }

  async list(request: Request): Promise<Pagination> {
    const limit = request.query.per_page ? +request.query.per_page : 10;
    const page = request.query.page ? +request.query.page : 1;
    const skip = (page - 1) * limit;


    const [data, total] = await this.task.findAndCount({
      relations: {subTasks: true},
      take: limit,
      skip: skip,
      order: { "id": "DESC" },
    });

    const response: Pagination = {
      data: data,
      total: total,
      last_page: Math.ceil(total / limit),
      current_page: page
    };

    return response;
  }

  async find(id: number): Promise<Task> {
    const task: Task = await this.task.findOne({
      where: { id: id }
    });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async create(data: CreateTaskDto): Promise<GenericResponse> {
    const has_task = await this.task.findOne({
      where: { title: data.title }
    });

    if (has_task) {
      throw new HttpException('Already exists task with this title', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (!data.description) {
      data.description = "";
    }

    try {
      const task = await this.task.save(data);
      return { message: 'task created', data: task };
    } catch (error) {
      return { error: `Error to create task: ${error}` };
    }
  }

  async update(id: number, data: Partial<Task>): Promise<GenericResponse> {
    const has_task = await this.task.findOne({
      where: { title: data.title }
    });

    if (has_task && has_task.id != id) {
      throw new HttpException('Already exists task with this title', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    try {
      this.task.update(id, data);
      return { message: 'Task updated', data: await this.task.findOne({ where: { id: id } }) };
    } catch (error) {
      return { error: 'Error to update task.' };
    }
  }

  async delete(id: number): Promise<GenericResponse> {
    const task = await this.task.findOne({
      where: { id: id }
    });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    try {
      this.task.remove(task);
      return { message: 'Task deleted' };
    } catch (error) {
      return { error: 'Error to delete task.' };
    }
  }


}
