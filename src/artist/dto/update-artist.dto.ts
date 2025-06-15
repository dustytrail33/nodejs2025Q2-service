import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, ValidateIf } from 'class-validator';

export class UpdateArtistDto {
  @ApiProperty({
    example: 'artist name',
  })
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.name !== undefined)
  name?: string;

  @ApiProperty({
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @ValidateIf((o) => o.grammy !== undefined)
  grammy?: boolean;
}
