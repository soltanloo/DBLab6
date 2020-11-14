import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import TodoEntity from './todo.entity';

@Entity()
export default class TodoItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => TodoEntity, (todo) => todo.items, {
    onDelete: 'CASCADE',
  })
  todo: TodoEntity;
}
