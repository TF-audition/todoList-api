import { Todo } from 'src/bad-todo/todo.entity';
import { CreateTodoDto } from '../dto/create-todo.dto';

export interface ITodoCreator {
  createTodo(createTodoDto: CreateTodoDto): Promise<Todo>;
}
