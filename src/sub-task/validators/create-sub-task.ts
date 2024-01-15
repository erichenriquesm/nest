import { IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class CreateSubTaskDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    description: string

    @IsEnum(Status)
    status: Status

    @IsNumber()
    taskId: number
}