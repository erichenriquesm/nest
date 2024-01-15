import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name: string;


    email?: string

    @IsString()
    @IsOptional()
    password: string;
}