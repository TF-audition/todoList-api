import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { TodoAlarmService } from '../services/todo-alarm.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { BaseTodo } from '../entities/base-todo.entity';

@Controller('todos')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly todoAlarmService: TodoAlarmService,
  ) {}

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<BaseTodo> {
    return await this.todoService.createTodo(createTodoDto);
  }

  @Get('date/:date')
  async findTodosByDate(@Param('date') date: string): Promise<BaseTodo[]> {
    return await this.todoService.findTodosByDate(date);
  }

  @Get('search')
  async searchTodos(@Query('keyword') keyword: string): Promise<BaseTodo[]> {
    return await this.todoService.searchTodos(keyword);
  }

  @Post(':id/alarm')
  async setAlarm(
    @Param('id') id: string,
    @Body('alarmTime') alarmTime: Date,
  ): Promise<void> {
    await this.todoAlarmService.setAlarm(id, alarmTime);
  }
}
