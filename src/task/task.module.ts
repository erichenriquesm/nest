import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig'; // Caminho para o seu arquivo de configuração TypeORM
import { Task } from './entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { SubTask } from 'src/sub-task/entities/sub-task.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { Auth } from 'src/facades/auth';
import { User } from 'src/user/entities/user.entity';
dotenv.config({ path: '../../.env' });

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: { expiresIn: process.env.EXPIRES || '1h' },
        }),
        TypeOrmModule.forRoot(ormconfig), 
        TypeOrmModule.forFeature([Task, SubTask, User])
    ],
    controllers: [TaskController],
    providers: [TaskService, Auth]
})
export class TaskModule {}
