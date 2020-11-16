import { ApiProperty } from '@nestjs/swagger';
import CreateTodoItemDto from './create-todo-item.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export default class UpdateTodoDto {
  @ApiProperty({
    description: 'Todo Name',
  })
  readonly title: string;
  @ApiProperty({
    description: 'Todo Description',
  })
  readonly description: string;
  @ApiProperty({
    description: 'Todo Category',
  })
  readonly categoryId: number;
  @ApiProperty({
    description: 'Todo Type',
  })
  readonly type: 'List' | 'Text';
  @ApiProperty({
    description: 'Todo Items',
  })
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateTodoItemDto)
  readonly items: CreateTodoItemDto[];
  @ApiProperty({
    description: 'Todo Tags',
  })
  readonly tags: number[];
  @ApiProperty({
    description: 'Todo Owner ID',
  })
  readonly userId: number;
}
