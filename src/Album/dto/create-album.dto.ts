import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    example: 'album name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'album year',
  })
  @IsNumber()
  @Min(0)
  year: number;

  @ApiProperty({
    example: 'artist id',
  })
  @IsOptional()
  @IsUUID()
  artistId?: string;
}
