import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class Favs {
  @ApiProperty({
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    isArray: true,
    type: Artist,
  })
  artists: Artist[];

  @ApiProperty({
    isArray: true,
    type: Album,
  })
  albums: Album[];

  @ApiProperty({
    isArray: true,
    type: Track,
  })
  tracks: Track[];
}
