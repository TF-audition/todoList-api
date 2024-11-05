import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { TodoAlarmService } from './services/todo-alarm.service';
import { Module } from '@nestjs/common';
import { BaseTodo } from './entities/base-todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BaseTodo])],
  controllers: [TodoController],
  providers: [TodoService, TodoAlarmService],
  // NotificationService
})
export class TodoModule {}
