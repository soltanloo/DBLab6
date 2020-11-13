import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty({
    description: 'Name',
    minLength: 3,
    default: 'Hossein',
    maxLength: 25,
  })
  readonly name: string;
  @ApiProperty({
    description: 'Username',
    minLength: 5,
    maxLength: 30,
  })
  readonly username: string;
  @ApiProperty({
    description: 'Password',
    minLength: 5,
    maxLength: 30,
  })
  readonly password: string;
}
