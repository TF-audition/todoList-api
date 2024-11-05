import { Injectable } from '@nestjs/common';
import { ITodoService } from './todo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService implements ITodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async createTodo(todo: any): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async findTodosByDate(date: Date): Promise<Todo[]> {
    return this.todoRepository.find({
      where: {
        dueDate: date,
      },
    });
  }

  async searchTodos(keyword: string): Promise<Todo[]> {
    return this.todoRepository.find({
      where: [
        { title: Like(`%${keyword}%`) },
        { description: Like(`%${keyword}%`) },
      ],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async setAlarm(todoId: string, alarmTime: Date): Promise<void> {
    // 알람 설정 로직
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sendNotification(todoId: string): Promise<void> {
    // 알림 전송 로직
  }
}
