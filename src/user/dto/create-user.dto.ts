import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
