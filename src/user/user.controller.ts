import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from '../dto/create-user.dto';
import { ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'New user created successfully' })
  @Post('post')
  postUser(@Body() user: CreateUserDto) {
    return this.usersService.insert(user);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Get all users successfully' })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
