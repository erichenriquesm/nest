import{
    Controller, 
    Post, 
    Req, 
    Body, 
    Put, 
    Param,
    Delete
} from '@nestjs/common';
import { SubTaskService } from './sub_task.service';
import { CreateSubTaskDto } from './validators/create-sub-task';
import { UpdateSubTaskDto } from './validators/update-sub-tasks.dto';

@Controller('sub-task')
export class SubTaskController {
    constructor(private sub_task_service: SubTaskService){}
    
    @Post()
    createSubTask(@Body() data: CreateSubTaskDto) {
        return this.sub_task_service.create(data);
    }

    @Put(':id')
    updateSubTask(@Param('id') id: number, @Body() data: UpdateSubTaskDto) {
        return this.sub_task_service.update(id, data);
    }

    @Delete(':id')
    deleteSubTask(@Param('id') id: number) {
        return this.sub_task_service.delete(id);
    }
}
