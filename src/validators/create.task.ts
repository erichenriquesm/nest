enum TaskStatus {
    PENDING = 'pending',
    COMPLETED = 'completed'
}
import { IsEmail, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsDateString()
    endDate: string;

    @IsEnum(TaskStatus)
    status: TaskStatus

    description: string
}