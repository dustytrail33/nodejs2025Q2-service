import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'john_doe',
    description: 'Login',
  })
  login: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '123',
    description: 'Password',
  })
  password: string;
}
