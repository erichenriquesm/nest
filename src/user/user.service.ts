import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IAuth } from 'src/interfaces/auth-interface';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { Auth } from 'src/facades/auth';
import * as dotenv from 'dotenv';
import { UpdateUserDto } from './dto/update-user.dto';
dotenv.config({ path: '../../.env' });

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authFacade: Auth,
        @InjectRepository(User)
        readonly user: Repository<User>
    ) { }

    async me(token: string){
        try {
            const decodedData = this.jwtService.decode(token);
            if (!decodedData) {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }

            return await this.authFacade.findUserByEmail(decodedData.email);

        } catch (error) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

    async create(data: CreateUserDto) {
        if(await this.authFacade.findUserByEmail(data.email)){
            throw new HttpException('This email is already in use', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        data.password = await bcrypt.hash(data.password, 10);
        await this.user.save(data);
        return await this.generateToken(data);
    }

    async login(data: LoginDto) {
        const userData = await this.authFacade.findUserByEmail(data.email, true);

        if (!userData) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const passwordMatch = await bcrypt.compare(data.password, userData.password);

        if (!passwordMatch) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        
        const { password, ...jwtData } = userData;

        return await this.generateToken(jwtData);
    }

    async update(data: UpdateUserDto) {
        const userData = await this.authFacade.getUserLogged();
        if(data.email){
            delete data.email;
        }

        if(data.password){
            data.password = await bcrypt.hash(data.password, 10);
        }

        Object.assign(userData, data);
        delete userData.password;
        await this.user.save(userData)
        return userData;
    }



    async generateToken(payload: any): Promise<IAuth> {
        return {
            auth: this.jwtService.sign(payload),
            expires_in: process.env.EXPIRES
        };
    }
}
