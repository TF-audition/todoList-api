import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseTodo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false }) // 기본값 설정
  @Column()
  completed: boolean;

  @Column({ nullable: true })
  alarmTime?: Date;

  @Column()
  dueDate: Date; // 기존 dueDate 유지
}
