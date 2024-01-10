import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { TaskController } from './task/task.controller';
import { AppService } from './app.service';
import { TaskService } from './task/task.service';
import { TestMiddleware } from './middlewares/test.middleware';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware).forRoutes('task')
  }
}
