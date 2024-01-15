import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './validators/create-user';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IAuth } from 'src/interfaces/auth-interface';
import * as dotenv from 'dotenv';
import { LoginDto } from './validators/login';
import { Request } from 'express';
dotenv.config({ path: '../../.env' });

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        readonly user: Repository<User>
    ) { }

    async me(token: string){
        try {
            const decodedData = this.jwtService.decode(token);
            if (!decodedData) {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }

            return await this.findUserByEmail(decodedData.email);

        } catch (error) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

    async create(data: CreateUserDto) {
        if(await this.findUserByEmail(data.email)){
            throw new HttpException('This email is already in use', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        data.password = await bcrypt.hash(data.password, 10);
        await this.user.save(data);
        return await this.generateToken(data);
    }

    async login(data: LoginDto) {
        const userData = await this.findUserByEmail(data.email);

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

    async update(req: Request) {
        const userData = await this.getUserLogged(req.headers.authorization);
        if(req.body.email){
            delete req.body.email;
        }

        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        Object.assign(userData, req.body);
        delete userData.password;
        await this.user.save(userData)
        return userData;
    }

    async getUserLogged(token: string): Promise<User>{
        const decodedData = this.jwtService.decode(token);
        if (!decodedData || decodedData && !decodedData.email) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        return await this.findUserByEmail(decodedData.email);
    }

    async findUserByEmail(email: string) : Promise<User>{
        return await this.user.findOne({
            where: {
                email: email
            },
            select: ['id', 'name', 'email', 'emailVerifiedAt']
        });
    }

    async generateToken(payload: any): Promise<IAuth> {
        return {
            auth: this.jwtService.sign(payload),
            expires_in: process.env.EXPIRES
        };
    }
}
