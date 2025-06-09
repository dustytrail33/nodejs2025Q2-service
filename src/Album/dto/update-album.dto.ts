import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsOptional, IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  @ApiProperty({
    example: 'album name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 200,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  year?: number;

  @ApiProperty({
    example: 'artist id',
  })
  @IsOptional()
  @IsUUID()
  artistId?: string | null;
}
