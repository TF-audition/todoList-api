import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseTodo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @Column({ nullable: true })
  alarmTime?: Date;
}
