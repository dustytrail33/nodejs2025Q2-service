import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { DB } from 'src/db/db.database';

@Injectable()
export class FavsService {
  getAll(): { artists: Artist[]; albums: Album[]; tracks: Track[] } {
    const artists = DB.favs.artists
      .map((id) => DB.artists.find((artist) => artist.id === id))
      .filter((a): a is Artist => !!a);

    const albums = DB.favs.albums
      .map((id) => DB.albums.find((album) => album.id === id))
      .filter((a): a is Album => !!a);

    const tracks = DB.favs.tracks
      .map((id) => DB.tracks.find((track) => track.id === id))
      .filter((t): t is Track => !!t);

    return { artists, albums, tracks };
  }

  addTrack(id: string): void {
    const track = DB.tracks.find((track) => track.id === id);
    if (!track) {
      throw new UnprocessableEntityException(`Track ${id} does not exist`);
    }
    if (DB.favs.tracks.includes(id)) {
      return;
    }
    DB.favs.tracks.push(id);
  }

  removeTrack(id: string): void {
    if (!DB.favs.tracks.includes(id)) {
      throw new NotFoundException(`Track ${id} is not in favorites`);
    }
    DB.favs.tracks = DB.favs.tracks.filter((trackId) => trackId !== id);
  }

  addAlbum(id: string): void {
    const album = DB.albums.find((album) => album.id === id);
    if (!album) {
      throw new UnprocessableEntityException(`Album ${id} does not exist`);
    }
    if (DB.favs.albums.includes(id)) return;
    DB.favs.albums.push(id);
  }

  removeAlbum(id: string): void {
    if (!DB.favs.albums.includes(id)) {
      throw new NotFoundException(`Album ${id} is not in favorites`);
    }
    DB.favs.albums = DB.favs.albums.filter((albumId) => albumId !== id);
  }

  addArtist(id: string): void {
    const artist = DB.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new UnprocessableEntityException(`Artist ${id} does not exist`);
    }
    if (DB.favs.artists.includes(id)) return;
    DB.favs.artists.push(id);
  }

  removeArtist(id: string): void {
    if (!DB.favs.artists.includes(id)) {
      throw new NotFoundException(`Artist ${id} is not in favorites`);
    }
    DB.favs.artists = DB.favs.artists.filter((artistId) => artistId !== id);
  }
}
