import { Module } from '@nestjs/common';
import { SubTaskController } from './sub_task.controller';
import { SubTaskService } from './sub_task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig.js'; // Caminho para o seu arquivo de configuração TypeORM
import { SubTask } from './entities/sub_task.entity';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([Task, SubTask])],
  controllers: [SubTaskController],
  providers: [SubTaskService]
})
export class SubTaskModule {}
