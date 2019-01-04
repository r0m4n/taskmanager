import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TaskService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TaskService],
})
export class AppModule {}
