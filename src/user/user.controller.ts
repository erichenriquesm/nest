import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Req,
    HttpException,
    HttpStatus,
    Param,
    Body,
    Headers
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post('register')
    createUser(@Body() data: CreateUserDto) {
        return this.userService.create(data);
    }

    @Put('')
    updateUser(@Body() data: UpdateUserDto) {
        return this.userService.update(data);
    }

    @Post('login')
    login(@Body() data: LoginDto) {
        return this.userService.login(data);
    }

    @Get('me')
    me(@Headers() headers){
        return this.userService.me(headers.authorization);
    }

}
