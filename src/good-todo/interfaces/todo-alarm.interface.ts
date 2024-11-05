export interface ITodoAlarm {
  setAlarm(todoId: string, alarmTime: Date): Promise<void>;
  sendNotification(todoId: string): Promise<void>;
}
