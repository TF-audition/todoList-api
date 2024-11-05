import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todo {
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
