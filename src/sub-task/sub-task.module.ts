import { Module } from '@nestjs/common';
import { SubTaskController } from './sub-task.controller';
import { SubTaskService } from './sub-task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig'; // Caminho para o seu arquivo de configuração TypeORM
import { SubTask } from './entities/sub-task.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { Auth } from 'src/facades/auth';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.EXPIRES || '1h' },
    }),
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Task, SubTask, User])
  ],
  controllers: [SubTaskController],
  providers: [SubTaskService, Auth]
})
export class SubTaskModule { }
