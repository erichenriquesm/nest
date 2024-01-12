import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class CreateSubTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string

    @IsEnum(Status)
    status: Status

    @IsNumber()
    taskId: number
}