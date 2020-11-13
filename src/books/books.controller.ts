import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { BooksService } from './books.service';
import CreateBookDto from '../dto/create-book.dto';
import DeleteBookDto from '../dto/delete-book.dto';
import UpdateBookDto from '../dto/update-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'New book created successfully' })
  @Post('post')
  postUser(@Body() book: CreateBookDto) {
    return this.booksService.insert(book);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Get all books successfully' })
  @Get()
  getAll() {
    return this.booksService.getAllBooks();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Book deleted successfully' })
  @Delete('delete')
  removeBook(@Body() book: DeleteBookDto) {
    return this.booksService.delete(book.id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('update')
  updateBook(@Body() book: UpdateBookDto) {
    return this.booksService.update(book);
  }
}
