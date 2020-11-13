import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BooksService } from './books.service';
import CreateBookDto from '../dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiResponse({ status: 200, description: 'New book created successfully' })
  @Post('post')
  postUser(@Body() book: CreateBookDto) {
    return this.booksService.insert(book);
  }

  @ApiResponse({ status: 200, description: 'Get all books successfully' })
  @Get()
  getAll() {
    return this.booksService.getAllBooks();
  }
}
