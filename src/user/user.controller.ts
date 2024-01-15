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
import { UpdateUserDto } from './validators/update-user';

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
    updateUser(@Body() data: UpdateUserDto, @Req() req) {
        return this.userService.update(data, req);
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
