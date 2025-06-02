import { IsString, IsNumber, Min, IsOptional, IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  year?: number;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;
}
