import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TodoService } from './todo.service';
import CreateTodoDto from '../dto/create-todo.dto';
import UpdateTodoDto from '../dto/update-todo.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'New todo created successfully' })
  @Post('')
  postTodo(@Body() todo: CreateTodoDto, @Request() req) {
    return this.todoService.insert(todo, req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Get all todos successfully' })
  @Get()
  getAll(@Request() req) {
    return this.todoService.getAll(req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Get a todo successfully' })
  @Get(':id')
  getOne(@Request() req, @Param('id', new ParseIntPipe()) todoId: number) {
    return this.todoService.get(req.user.id, todoId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Todo deleted successfully' })
  @Delete(':id')
  removeTodo(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    return this.todoService.delete(id, req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateTodo(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() todo: UpdateTodoDto,
    @Request() req,
  ) {
    return this.todoService.update(id, todo, req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Todo item deleted successfully' })
  @Delete(':id/item/:itemId')
  removeTodoItem(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('itemId', new ParseIntPipe()) itemId: number,
    @Request() req,
  ) {
    return this.todoService.deleteItem(id, itemId, req.user.id);
  }
}
