import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestMiddleware } from './middlewares/test.middleware';
import { TaskModule } from './tasks/task.module';
import { SubTaskModule } from './sub_tasks/sub_task.module';

@Module({
  imports: [TaskModule, SubTaskModule],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware).forRoutes('task')
  }
}
