export interface ITodoUpdater {
  updateTodoCompletion(id: string, completed: boolean): Promise<void>;
}
