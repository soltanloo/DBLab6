import { Body, Controller, Get, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from '../dto/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiResponse({ status: 200, description: 'New user created successfully' })
  @Post('post')
  postUser(@Body() user: CreateUserDto) {
    return this.usersService.insert(user);
  }

  @ApiResponse({ status: 200, description: 'Get all users successfully' })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiResponse({ status: 200, description: 'Get books of a user successfully' })
  @Get('books')
  getBooks(@Body('userID', ParseIntPipe) userID: number) {
    return this.usersService.getBooksOfUser(userID);
  }
}
