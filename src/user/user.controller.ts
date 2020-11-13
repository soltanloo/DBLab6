import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from '../dto/create-user.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

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
  @ApiQuery({
    name: 'userID',
    required: true,
    type: Number,
  })
  @Get('books')
  getBooks(@Query('userID') userID: number) {
    return this.usersService.getBooksOfUser(userID);
  }
}
