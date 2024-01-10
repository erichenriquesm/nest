import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  HttpException,
  HttpStatus,
  Param,
  Body
} from '@nestjs/common';
import { Request } from 'express';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from 'src/validators/create.task';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get('/list')
  getTasks(@Req() request: Request) {
    return this.taskService.list(request);
  }

  @Get(':id')
  getTask(@Param('id') id: number) {
    return this.taskService.find(id);
  }

  @Post()
  saveTask(@Body() createCatDto: CreateTaskDto) {
    return this.taskService.create(createCatDto);
  }

  @Put(':id')
  updateTask(@Param('id') id: number, @Body() data) {
    return this.taskService.update(id, data);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number, @Req() req) {
    return this.taskService.delete(id);
  }
}
