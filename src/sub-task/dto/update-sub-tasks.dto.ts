import { IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class UpdateSubTaskDto {
    @IsNotEmpty()
    @IsOptional()
    title: string;

    @IsNotEmpty()
    @IsOptional()
    description: string

    @IsEnum(Status)
    @IsOptional()
    status?: Status

    @IsNumber()
    taskId: number
}