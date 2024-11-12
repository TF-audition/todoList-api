export interface ITodoDeleter {
  deleteTodo(id: string): Promise<void>;
}
