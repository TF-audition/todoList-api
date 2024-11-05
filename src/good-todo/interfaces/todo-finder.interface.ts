import { Todo } from 'src/bad-todo/todo.entity';

export interface ITodoFinder {
  findTodosByDate(date: string): Promise<Todo[]>;
  searchTodos(keyword: string): Promise<Todo[]>;
}
