import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) throw new NotFoundException(`Artist ${id} not found`);
    return artist;
  }

  async create(dto: CreateArtistDto) {
    return this.prisma.artist.create({
      data: {
        name: dto.name,
        grammy: dto.grammy,
      },
    });
  }

  async update(id: string, dto: UpdateArtistDto) {
    const existing = await this.prisma.artist.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Artist ${id} not found`);

    return this.prisma.artist.update({
      where: { id },
      data: {
        name: dto.name ?? existing.name,
        grammy: dto.grammy ?? existing.grammy,
      },
    });
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    if (!artist) {
      return null;
    }
    return this.prisma.artist.delete({ where: { id } });
  }
}
