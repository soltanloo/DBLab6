import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import GenreService from './genre.service';
import CreateGenreDto from '../dto/create-genre.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('genre')
export default class GenreController {
  constructor(private readonly genreService: GenreService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Created genre successfully' })
  @Post('post')
  postGenre(@Body() genre: CreateGenreDto) {
    return this.genreService.insert(genre);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Get all genres successfully' })
  @Get()
  getAll() {
    return this.genreService.getAllGenre();
  }
}
