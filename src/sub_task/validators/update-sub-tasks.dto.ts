import { IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
enum SubTaskStatus {
    PENDING = 'pending',
    COMPLETED = 'completed'
}

export class UpdateSubTaskDto {
    @IsNotEmpty()
    @IsOptional()
    title: string;

    @IsNotEmpty()
    @IsOptional()
    description: string

    @IsEnum(SubTaskStatus)
    @IsOptional()
    status?: SubTaskStatus

    @IsNumber()
    taskId: number
}