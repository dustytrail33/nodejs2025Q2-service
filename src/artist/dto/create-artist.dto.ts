import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    example: 'artist name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  grammy: boolean;
}
