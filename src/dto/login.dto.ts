import { ApiProperty } from '@nestjs/swagger';

export default class LoginDto {
  @ApiProperty({
    description: 'Username',
  })
  readonly username: string;
  @ApiProperty({
    description: 'Password',
  })
  readonly password: string;
}
