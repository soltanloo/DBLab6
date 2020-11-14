import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import UserEntity from './user.entity';
import CategoryEntity from './category.entity';
import TagEntity from './tag.entity';
import TodoItemEntity from './todo-item.entity';

@Entity()
export default class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: 'List' | 'Text';

  @ManyToOne(() => CategoryEntity, (category) => category.todos, {
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;

  @ManyToMany(() => TagEntity, { onUpdate: 'CASCADE' })
  @JoinTable()
  tags: TagEntity[];

  @OneToMany(() => TodoItemEntity, (todoItem) => todoItem.todo)
  items?: TodoItemEntity[];

  @ManyToOne(() => UserEntity, (user) => user.todos, { onDelete: 'CASCADE' })
  user: UserEntity;
}
