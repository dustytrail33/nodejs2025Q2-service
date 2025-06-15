import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Login',
  })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password',
  })
  password: string;
}
