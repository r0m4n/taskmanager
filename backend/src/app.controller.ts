import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { TaskService } from './app.service';

@Controller('tasks')
export class AppController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll() {
    return this.taskService.getTasks();
  }

  @Post()
  create(@Body() createTask) {
    return this.taskService.createTask(createTask);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.taskService.deleteTask(id);
  }

  @Put(':id')
  update(@Param('id') id) {
    return this.taskService.completeTask(id);
  }
}
