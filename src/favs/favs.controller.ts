import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { UuidValidationPipe } from 'src/utils/uuid-validation.pipe';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.favsService.getAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id', UuidValidationPipe) id: string) {
    this.favsService.addTrack(id);
    return { message: `Track ${id} added to favorites` };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', UuidValidationPipe) id: string) {
    this.favsService.removeTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id', UuidValidationPipe) id: string) {
    this.favsService.addAlbum(id);
    return { message: `Album ${id} added to favorites` };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', UuidValidationPipe) id: string) {
    this.favsService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id', UuidValidationPipe) id: string) {
    this.favsService.addArtist(id);
    return { message: `Artist ${id} added to favorites` };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', UuidValidationPipe) id: string) {
    this.favsService.removeArtist(id);
  }
}
