import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

export const DB = {
  users: [] as User[],
  artists: [] as Artist[],
  tracks: [] as Track[],
  albums: [] as Album[],
  favs: {
    artists: [] as string[],
    albums: [] as string[],
    tracks: [] as string[],
  },
};
