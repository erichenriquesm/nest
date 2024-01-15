import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Request } from 'express';
import { Pagination } from 'src/interfaces/pagination-interface';
import { GenericResponse } from 'src/interfaces/generic-response-interface';
import { CreateTaskDto } from 'src/task/validators/create-task';
import { SubTask } from 'src/sub-task/entities/sub-task.entity';
import { Status } from 'src/enum/status.enum';
import { Auth } from 'src/facades/auth';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    private readonly authFacade: Auth,
    @InjectRepository(Task)
    readonly task: Repository<Task>,
    @InjectRepository(SubTask)
    readonly subTask: Repository<SubTask>
  ) { 
  }

  async list(request: Request): Promise<Pagination> {
    const limit = request.query.perPage ? +request.query.perPage : 10;
    const page = request.query.page ? +request.query.page : 1;
    const skip = (page - 1) * limit;
    const user = await this.authFacade.getUserLogged();

    const currentDate = new Date();
    
    let conditions:{userId: number, endDate?:any} = {
      userId: user.id
    };

    if(request.query.filterBy){
      conditions.endDate = request.query.filterBy == 'expired' ? LessThan(currentDate) : MoreThan(currentDate);
    }

    const [data, total] = await this.task.findAndCount({
      relations: {subTasks: true},
      take: limit,
      skip: skip,
      order: { "id": "DESC" },
      where: conditions
    });

    const response: Pagination = {
      data: data,
      total: total,
      lastPage: Math.ceil(total / limit),
      currentPage: page
    };

    return response;
  }

  async find(id: number): Promise<Task> {
    const user = await this.authFacade.getUserLogged();
    const task: Task = await this.task.findOne({
      where: { 
        id: id,
        userId: user.id
      }
    });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async create(data: CreateTaskDto): Promise<GenericResponse> {
    const hasTask = await this.task.findOne({
      where: { title: data.title }
    });

    if (hasTask) {
      throw new HttpException('Already exists task with this title', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (!data.description) {
      data.description = "";
    }

    try {
      const task = await this.task.save({
        ...data,
        user: await this.authFacade.getUserLogged()
      });
      return { message: 'task created', data: task };
    } catch (error) {
      return { error: `Error to create task: ${error}` };
    }
  }

  async update(id: number, data: Partial<Task>): Promise<GenericResponse> {
    const user = await this.authFacade.getUserLogged();
    const task = await this.task.findOne({
      where: {
        id: id,
        userId: user.id
      }
    });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    
    const hasTask = await this.task.findOne({
      where: { title: data.title, userId: user.id }
    });


    if (hasTask && hasTask.id != task.id) {
      throw new HttpException('Already exists task with this title', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    try {
      this.task.update(id, data);
      
      if(data.status){
        
        const status:Status = data.status;
        console.log(status);
        await this.subTask.createQueryBuilder()
        .update(SubTask)
        .set({ status:  status})
        .where('taskId = :taskId', { taskId: id })
        .execute();
      }

      return { message: 'Task updated', data: await this.task.findOne({ where: { id: id } }) };
    } catch (error) {
      return { error: 'Error to update task.' };
    }
  }

  async delete(id: number): Promise<GenericResponse> {
    const user = await this.authFacade.getUserLogged();
    const task = await this.task.findOne({
      where: { 
        id: id,
        userId: user.id
      }
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
