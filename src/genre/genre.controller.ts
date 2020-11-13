import { Body, Controller, Get, Post } from '@nestjs/common';
import GenreService from './genre.service';
import CreateGenreDto from '../dto/create-genre.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('genre')
export default class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiResponse({ status: 200, description: 'Created genre successfully' })
  @Post('post')
  postGenre(@Body() genre: CreateGenreDto) {
    return this.genreService.insert(genre);
  }

  @ApiResponse({ status: 200, description: 'Get all genres successfully' })
  @Get()
  getAll() {
    return this.genreService.getAllGenre();
  }
}
