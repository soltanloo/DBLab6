import { ApiProperty } from '@nestjs/swagger';

export default class CreateBookDto {
  @ApiProperty({
    description: 'Book Name',
    default: 'Sample Book',
  })
  readonly name: string;
  @ApiProperty({
    description: 'Book Owner ID',
  })
  readonly userID: number;
  @ApiProperty({
    description: 'Book Genres',
    default: [],
  })
  readonly genreIDs: number[];
}
