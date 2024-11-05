import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITodoCreator } from '../interfaces/todo-creator.interface';
import { ITodoFinder } from '../interfaces/todo-finder.interface';
import { Like, Repository } from 'typeorm';
import { BaseTodo } from '../entities/base-todo.entity';
import { CreateTodoDto } from '../dto/create-todo.dto';

@Injectable()
export class TodoService implements ITodoCreator, ITodoFinder {
  constructor(
    @InjectRepository(BaseTodo)
    private readonly todoRepository: Repository<BaseTodo>,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<BaseTodo> {
    const todo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(todo);
  }

  async findTodosByDate(date: string): Promise<BaseTodo[]> {
    return await this.todoRepository
      .createQueryBuilder('todo')
      .where('todo."dueDate" = :date', { date })
      .getMany();
  }

  async searchTodos(keyword: string): Promise<BaseTodo[]> {
    return await this.todoRepository.find({
      where: [
        { title: Like(`%${keyword}%`) },
        { description: Like(`%${keyword}%`) },
      ],
    });
  }
}
