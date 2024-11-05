import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  dueDate: Date;
}
