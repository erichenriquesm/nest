import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

export class Auth {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        readonly user: Repository<User>,
        @Inject('REQUEST')
        private readonly  req: Request
    ){}

    async getUserLogged(): Promise<User>{
        const decodedData = this.jwtService.decode(this.req.headers.authorization);
        if (!decodedData || decodedData && !decodedData.email) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        return await this.findUserByEmail(decodedData.email);
    }

    async findUserByEmail(email: string, password_field = false) : Promise<User>{
        const fields:any[] = ['id', 'name', 'email', 'emailVerifiedAt'];
        if(password_field){
            fields.push('password');
        }
        return await this.user.findOne({
            where: {
                email: email
            },
            select: fields
        });
    }
}