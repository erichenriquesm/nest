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
import { CreateUserDto } from './validators/create-user';
import { LoginDto } from './validators/login';

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
    updateUser(@Req() data) {
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
