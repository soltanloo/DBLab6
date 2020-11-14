import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import TodoEntity from './todo.entity';

@Entity()
export default class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => TodoEntity, (todo) => todo.category)
  todos: TodoEntity[];
}
