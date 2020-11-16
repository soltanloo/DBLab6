import { ApiProperty } from '@nestjs/swagger';

export default class CreateTagDto {
  @ApiProperty({
    description: 'Tag Name',
    default: 'Sample Tag',
  })
  readonly title: string;
}
