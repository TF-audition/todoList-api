import { Todo } from './todo.entity';

export interface ITodoService {
  createTodo(todo: any): Promise<Todo>;
  findTodosByDate(date: Date): Promise<Todo[]>;
  searchTodos(keyword: string): Promise<Todo[]>;
  setAlarm(todoId: string, alarmTime: Date): Promise<void>;
  sendNotification(todoId: string): Promise<void>;
}
