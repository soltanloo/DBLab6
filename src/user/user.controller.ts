import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from '../dto/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @ApiResponse({ status: 200, description: 'New user created successfully' })
  @Post('')
  postUser(@Body() user: CreateUserDto) {
    return this.usersService.insert(user);
  }
}
