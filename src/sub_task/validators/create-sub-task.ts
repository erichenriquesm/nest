import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
enum SubTaskStatus {
    PENDING = 'pending',
    COMPLETED = 'completed'
}

export class CreateSubTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string

    @IsEnum(SubTaskStatus)
    status: SubTaskStatus

    @IsNumber()
    taskId: number
}