import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITodoAlarm } from '../interfaces/todo-alarm.interface';
import { BaseTodo } from '../entities/base-todo.entity';

@Injectable()
export class TodoAlarmService implements ITodoAlarm {
  constructor(
    @InjectRepository(BaseTodo)
    private readonly todoRepository: Repository<BaseTodo>,
    // private readonly notificationService: NotificationService,
  ) {}

  async setAlarm(todoId: string, alarmTime: Date): Promise<void> {
    await this.todoRepository.update(todoId, { alarmTime });
  }

  async sendNotification(todoId: string): Promise<void> {
    const todo = await this.todoRepository.findOne({ where: { id: todoId } });
    if (todo && todo.alarmTime) {
      // await this.notificationService.send(`BaseTodo "${todo.title}" is due!`);
    }
  }
}
