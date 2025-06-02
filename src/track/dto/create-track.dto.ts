import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    example: 'trackName',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Artist id',
    nullable: true,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  artistId?: string;

  @ApiProperty({
    description: 'Album id',
    nullable: true,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  albumId?: string;

  @ApiProperty({
    description: 'Duration',
    type: 'integer',
    example: 400,
  })
  @IsNumber()
  @Min(0)
  duration: number;
}
