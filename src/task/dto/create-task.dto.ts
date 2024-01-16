import { IsNotEmpty, IsDateString, IsEnum, IsNumber } from 'class-validator';
import { Status } from 'src/enum/status.enum';
export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsDateString()
    endDate: string;

    @IsEnum(Status)
    status: Status

    description: string
}