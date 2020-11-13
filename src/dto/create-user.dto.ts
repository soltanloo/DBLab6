import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty({
    description: 'Name',
    minLength: 3,
    default: 'Hossein',
    maxLength: 25,
  })
  readonly name: string;
}
