import { Injectable } from '@nestjs/common';
import UserEntity from '../db/entity/user.entity';
import CreateUserDto from '../dto/create-user.dto';

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
    return await UserEntity.findOne({
      where: { username },
      relations: ['todos'],
    });
  }
}
