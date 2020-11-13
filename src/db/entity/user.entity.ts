import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  Unique,
} from 'typeorm';
import BookEntity from './book.entity';

@Entity()
export default class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 30 })
  password: string;

  @Column({ length: 500 })
  name: string;

  @OneToMany(() => BookEntity, (book) => book.user)
  books: BookEntity[];
}
