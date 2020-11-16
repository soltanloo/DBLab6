import { ApiProperty } from '@nestjs/swagger';

export default class CreateCategoryDto {
  @ApiProperty({
    description: 'Category Name',
    default: 'Sample Category',
  })
  readonly title: string;
}
