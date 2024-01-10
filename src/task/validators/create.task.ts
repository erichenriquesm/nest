import { IsNotEmpty, IsDateString, IsEnum } from 'class-validator';
enum TaskStatus {
    PENDING = 'pending',
    COMPLETED = 'completed'
}

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsDateString()
    endDate: string;

    @IsEnum(TaskStatus)
    status: TaskStatus

    description: string
}