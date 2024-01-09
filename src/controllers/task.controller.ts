import { Controller, Get, Post, Put, Delete, Req, HttpException, HttpStatus, Param } from '@nestjs/common';
import { Request } from 'express';
import { TaskService } from '../services/task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/list')
  getTasks(@Req() request:Request) {
    return this.taskService.list(request);
  }

  @Post()
  saveTask(@Req() request) {
    if (!request.body.title) {
      throw new HttpException('The title field is required', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (!request.body.endDate) {
      throw new HttpException('The endDate field is required', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return this.taskService.create(request.body);
  }

  @Put(':id')
  updateTask(@Param('id') id: number, @Req() req) {
    return this.taskService.update(id, req.body);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number, @Req() req) {
    return this.taskService.delete(id);
  }
}
