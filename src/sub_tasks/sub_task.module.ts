import { Module } from '@nestjs/common';
import { SubTaskController } from './sub_task.controller';
import { SubTaskService } from './sub_task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig.js'; // Caminho para o seu arquivo de configuração TypeORM
import { SubTaskEntity } from './entities/sub_task.entity';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([SubTaskEntity])],
  controllers: [SubTaskController],
  providers: [SubTaskService]
})
export class SubTaskModule {}
