import { Injectable } from '@nestjs/common';
import UserEntity from '../db/entity/user.entity';
import CreateUserDto from '../dto/create-user.dto';
import BookEntity from '../db/entity/book.entity';
import { getConnection } from 'typeorm';
import { options } from 'tsconfig-paths/lib/options';

@Injectable()
export class UserService {
  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    const { name, username, password } = userDetails;
    userEntity.name = name;
    userEntity.username = username;
    userEntity.password = password;
    await UserEntity.save(userEntity);
    return userEntity;
  }
  async getUser(username: string): Promise<UserEntity> {
    const user = await UserEntity.findOne({ where: { username } });
    return user;
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }
  async getBooksOfUser(userID: number): Promise<BookEntity[]> {
    console.log(typeof userID);
    const user: UserEntity = await UserEntity.findOne({
      where: { id: userID },
      relations: ['books'],
    });
    return user.books;
  }
}
