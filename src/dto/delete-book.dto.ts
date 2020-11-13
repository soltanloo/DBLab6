import { ApiProperty } from '@nestjs/swagger';

export default class DeleteBookDto {
  @ApiProperty({
    description: 'Book ID',
  })
  readonly id: number;
}
