import { ApiProperty } from '@nestjs/swagger';

export default class UpdateBookDto {
  @ApiProperty({
    description: 'Book ID',
  })
  readonly id: number;
  @ApiProperty({
    description: 'Book Name',
  })
  readonly name: string;
  @ApiProperty({
    description: 'Book Owner ID',
  })
  readonly userID: number;
  @ApiProperty({
    description: 'Book Genres',
  })
  readonly genreIDs: number[];
}
