import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITodoCreator } from '../interfaces/todo-creator.interface';
import { ITodoFinder } from '../interfaces/todo-finder.interface';
import { ITodoUpdater } from '../interfaces/todo-updater.interface';
import { ITodoDeleter } from '../interfaces/todo-deleter.interface';
import { Like, Repository } from 'typeorm';
import { BaseTodo } from '../entities/base-todo.entity';
import { CreateTodoDto } from '../dto/create-todo.dto';

@Injectable()
export class TodoService
  implements ITodoCreator, ITodoFinder, ITodoUpdater, ITodoDeleter
{
  constructor(
    @InjectRepository(BaseTodo)
    private readonly todoRepository: Repository<BaseTodo>,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<BaseTodo> {
    const todo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(todo);
  }

  async findTodosByDate(date: string): Promise<BaseTodo[]> {
    const todos = await this.todoRepository
      .createQueryBuilder('todo')
      .where('DATE(todo."dueDate") = :date', { date })
      .getMany();

    return todos.map((todo) => {
      const localDueDate = new Date(todo.dueDate);
      localDueDate.setHours(localDueDate.getHours() + 10);
      return {
        ...todo,
        dueDate: localDueDate,
      };
    });
  }

  async searchTodos(keyword: string): Promise<BaseTodo[]> {
    const todos = await this.todoRepository.find({
      where: [
        { title: Like(`%${keyword}%`) },
        { description: Like(`%${keyword}%`) },
      ],
    });

    return todos.map((todo) => {
      const localDueDate = new Date(todo.dueDate);
      localDueDate.setHours(localDueDate.getHours() + 10);
      return {
        ...todo,
        dueDate: localDueDate,
      };
    });
  }

  async findAllTodos(): Promise<BaseTodo[]> {
    const todos = await this.todoRepository.find();
    return todos.map((todo) => {
      const localDueDate = new Date(todo.dueDate);
      localDueDate.setHours(localDueDate.getHours() + 10);
      return {
        ...todo,
        dueDate: localDueDate,
      };
    });
  }

  async updateTodoCompletion(id: string, completed: boolean): Promise<void> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    todo.completed = completed;
    await this.todoRepository.save(todo);
  }

  async deleteTodo(id: string): Promise<void> {
    const result = await this.todoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
