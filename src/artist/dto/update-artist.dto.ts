import { IsString, IsBoolean, IsOptional, ValidateIf } from 'class-validator';

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.name !== undefined)
  name?: string;

  @IsOptional()
  @IsBoolean()
  @ValidateIf((o) => o.grammy !== undefined)
  grammy?: boolean;
}
