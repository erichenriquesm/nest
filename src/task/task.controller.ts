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
import { TaskService } from './task.service';
import { CreateTaskDto } from 'src/task/validators/create-task';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get('/list')
  getTasks(@Req() request: Request) {
    return this.taskService.list(request);
  }

  @Get(':id')
  getTask(@Param('id') id: number, @Req() req) {
    return this.taskService.find(id, req);
  }

  @Post()
  saveTask(@Body() createCatDto: CreateTaskDto, @Req() req) {
    return this.taskService.create(createCatDto, req);
  }

  @Put(':id')
  updateTask(@Param('id') id: number, @Body() data, @Req() req) {
    return this.taskService.update(id, data, req);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number, @Req() req) {
    return this.taskService.delete(id, req);
  }
}
