import{
    Controller, 
    Post, 
    Req, 
    Body, 
    Put, 
    Param,
    Delete
} from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { CreateSubTaskDto } from './validators/create-sub-task';
import { UpdateSubTaskDto } from './validators/update-sub-tasks.dto';

@Controller('sub-task')
export class SubTaskController {
    constructor(private subTaskService: SubTaskService){}
    
    @Post()
    createSubTask(@Body() data: CreateSubTaskDto, @Req() req) {
        return this.subTaskService.create(data, req);
    }

    @Put(':id')
    updateSubTask(@Param('id') id: number, @Body() data: UpdateSubTaskDto, @Req() req) {
        return this.subTaskService.update(id, data, req);
    }

    @Delete(':id')
    deleteSubTask(@Param('id') id: number, @Req() req) {
        return this.subTaskService.delete(id, req);
    }
}
