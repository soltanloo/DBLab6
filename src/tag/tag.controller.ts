import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import TagService from './tag.service';
import CreateTagDto from '../dto/create-tag.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tag')
export default class TagController {
  constructor(private readonly tagService: TagService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Creates tag successfully' })
  @Post()
  postTag(@Body() tag: CreateTagDto) {
    return this.tagService.insert(tag);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Returns all tags successfully',
  })
  @Get()
  getAll() {
    return this.tagService.getAll();
  }
}
