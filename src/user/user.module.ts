import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig'; // Caminho para o seu arquivo de configuração TypeORM
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Auth } from 'src/facades/auth';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: { expiresIn: process.env.EXPIRES || '1h' },
        }), 
        TypeOrmModule.forRoot(ormconfig), 
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService, Auth]
})
export class UserModule { }
