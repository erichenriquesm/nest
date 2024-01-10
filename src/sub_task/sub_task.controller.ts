import { Controller, Post, Req, Body } from '@nestjs/common';
import { SubTaskService } from './sub_task.service';
import { CreateSubTaskDto } from './validators/create.sub.task';

@Controller('sub-task')
export class SubTaskController {
    constructor(private sub_task_service: SubTaskService){}
    
    @Post()
    createSubTask(@Body() data: CreateSubTaskDto) {
        return this.sub_task_service.create(data);
    }
}
