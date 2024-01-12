import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig'; // Caminho para o seu arquivo de configuração TypeORM
import { Task } from './entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { SubTask } from 'src/sub-task/entities/sub-task.entity';

@Module({
    imports: [TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([Task, SubTask])],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule {}
