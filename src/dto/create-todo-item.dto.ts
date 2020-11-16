import { ApiProperty } from '@nestjs/swagger';

export default class CreateTodoItemDto {
  @ApiProperty({
    description: 'Todo Name',
    default: 'Sample Todo',
  })
  readonly title: string;
}
