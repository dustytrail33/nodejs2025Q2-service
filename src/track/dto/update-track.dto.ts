import { IsString, IsNumber, Min, IsOptional, IsUUID } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;

  @IsOptional()
  @IsUUID()
  albumId?: string | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number;
}
