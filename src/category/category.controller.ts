import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CategoryService from './category.service';
import CreateCategoryDto from '../dto/create-category.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('category')
export default class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Creates category successfully' })
  @Post()
  postCategory(@Body() category: CreateCategoryDto) {
    return this.categoryService.insert(category);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Returns all categories successfully',
  })
  @Get()
  getAll() {
    return this.categoryService.getAll();
  }
}
