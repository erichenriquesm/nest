import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './middlewares/auth-middleware';
import { TaskModule } from './task/task.module';
import { SubTaskModule } from './sub-task/sub-task.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
dotenv.config({ path: '../.env' });

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.EXPIRES || '1h' },
    }),
    UserModule,
    TaskModule,
    SubTaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('user/login', 'user/register').forRoutes('user', 'task', 'subtask')
  }
}
