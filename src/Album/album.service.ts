import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new NotFoundException(`Album ${id} not found`);
    return album;
  }

  async create(dto: CreateAlbumDto): Promise<Album> {
    if (dto.artistId) {
      const artistExists = await this.prisma.artist.findUnique({
        where: { id: dto.artistId },
      });
      if (!artistExists) {
        throw new UnprocessableEntityException(
          `Artist ${dto.artistId} does not exist`,
        );
      }
    }

    return this.prisma.album.create({
      data: {
        name: dto.name,
        year: dto.year,
        artistId: dto.artistId ?? null,
      },
    });
  }

  async remove(id: string): Promise<Album> {
    const album = await this.findOne(id);
    if (!album) {
      return null;
    }
    return this.prisma.album.delete({ where: { id } });
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new NotFoundException(`Album ${id} not found`);

    return this.prisma.album.update({
      where: { id },
      data: {
        name: dto.name ?? album.name,
        year: dto.year ?? album.year,
        artistId: dto.artistId ?? null,
      },
    });
  }
}
