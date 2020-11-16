import { ApiProperty } from '@nestjs/swagger';
import CreateTodoItemDto from './create-todo-item.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export default class CreateTodoDto {
  @ApiProperty({
    description: 'Todo Name',
    default: 'Sample Todo',
  })
  readonly title: string;
  @ApiProperty({
    description: 'Todo Description',
    default: 'Sample Description',
  })
  readonly description: string;
  @ApiProperty({
    description: 'Todo Category',
  })
  readonly categoryId: number;
  @ApiProperty({
    description: 'Todo Type',
    default: 'Text',
  })
  readonly type: 'List' | 'Text';
  @ApiProperty({
    description: 'Todo Items',
    default: [],
  })
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateTodoItemDto)
  readonly items: CreateTodoItemDto[];
  @ApiProperty({
    description: 'Todo Tags',
    default: [],
  })
  readonly tags: number[];
}
