import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig.js'; // Caminho para o seu arquivo de configuração TypeORM
import { TaskEntity } from './entities/task.entity.js';
import { TaskController } from './task.controller.js';
import { TaskService } from './task.service.js';

@Module({
    imports: [TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([TaskEntity])],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule {}
