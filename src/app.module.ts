import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TaskController } from './controllers/task.controller';
import { AppService } from './services/app.service';
import { TaskService } from './services/task.service';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { TestMiddleware } from './middlewares/test.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), DatabaseModule],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService],
  exports: [TaskService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware).forRoutes('task')
  }
}
