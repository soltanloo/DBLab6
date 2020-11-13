import { ApiProperty } from '@nestjs/swagger';

export default class CreateGenreDto {
  @ApiProperty({
    description: 'Genre Name',
    default: 'Sample Genre',
  })
  readonly type: string;
}
