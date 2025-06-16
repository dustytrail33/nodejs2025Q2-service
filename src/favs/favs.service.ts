import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Favs } from './entities/favs.entity';
import { Track } from 'src/track/entities/track.entity';
import { TrackService } from 'src/track/track.service';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'generated/prisma';

const include = {
  albums: {
    select: {
      id: true,
      name: true,
      year: true,
      artistId: true,
    },
  },
  artists: {
    select: {
      id: true,
      name: true,
      grammy: true,
    },
  },
  tracks: {
    select: {
      id: true,
      name: true,
      duration: true,
      albumId: true,
      artistId: true,
    },
  },
};

@Injectable()
export class FavsService {
  constructor(
    private readonly prisma: PrismaService,
    private trackService: TrackService,
  ) {}

  async getFavorites() {
    const favorite = await this.getFavoriteOrCreate();
    return {
      albums: favorite.albums,
      artists: favorite.artists,
      tracks: favorite.tracks,
    };
  }

  async addTrack(id: string): Promise<Track | null> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track || track.favoriteId) {
      throw new UnprocessableEntityException(`Track ${id} doesn't exist`);
    }

    const favorite = await this.getFavoriteOrCreate();
    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: {
        favoriteId: favorite.id,
      },
    });

    return updatedTrack;
  }

  async removeTrack(id: string): Promise<string | null> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) throw new NotFoundException(`Track ${id} not found`);

    await this.prisma.track.update({
      where: { id },
      data: { favoriteId: null },
    });

    return id;
  }

  async addArtist(id: string): Promise<Artist | null> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist || artist.favoriteId) {
      throw new UnprocessableEntityException(
        `Artist ${id} doesn't exist or already in favorites`,
      );
    }

    const favorite = await this.getFavoriteOrCreate();
    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: {
        favoriteId: favorite.id,
      },
    });

    return updatedArtist;
  }

  async removeArtist(id: string): Promise<string | null> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) throw new NotFoundException(`Artist ${id} not found`);

    await this.prisma.artist.update({
      where: { id },
      data: { favoriteId: null },
    });

    return id;
  }

  private async getFavoriteOrCreate() {
    const favorites = await this.findAll();
    if (!favorites.length) {
      return this.create();
    }
    return favorites[0];
  }

  async addAlbum(id: string): Promise<Album | null> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album || album.favoriteId) {
      throw new UnprocessableEntityException(
        `Album ${id} doesn't exist or already in favorites`,
      );
    }

    const favorite = await this.getFavoriteOrCreate();
    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: {
        favoriteId: favorite.id,
      },
    });

    return updatedAlbum;
  }

  async removeAlbum(id: string): Promise<string | null> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new NotFoundException(`Album ${id} not found`);

    await this.prisma.album.update({
      where: { id },
      data: { favoriteId: null },
    });

    return id;
  }

  async create(): Promise<Favs> {
    return this.prisma.favs.create({
      data: {},
      include,
    }) as unknown as Favs;
  }

  async findAll(): Promise<Favs[]> {
    return this.prisma.favs.findMany({
      include,
    }) as unknown as Favs[];
  }
}
