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
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Favs } from './entities/favs.entity';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all favorites',
    type: Favs,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.favsService.getAll();
  }

  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiParam({
    name: 'id',
    description: 'Track ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 201,
    description: 'Returns if track has been added to the favorites',
  })
  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id', UuidValidationPipe) id: string) {
    this.favsService.addTrack(id);
    return { message: `Track ${id} added to favorites` };
  }

  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @ApiParam({
    name: 'id',
    description: 'Track ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 204,
    description: 'Returns if track has been removed',
  })
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', UuidValidationPipe) id: string) {
    this.favsService.removeTrack(id);
  }

  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiParam({
    name: 'id',
    description: 'Album ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 201,
    description: 'Returns if album has been added to the favorites',
  })
  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id', UuidValidationPipe) id: string) {
    this.favsService.addAlbum(id);
    return { message: `Album ${id} added to favorites` };
  }

  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiParam({
    name: 'id',
    description: 'Album ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 204,
    description: 'Returns if album has been removed',
  })
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', UuidValidationPipe) id: string) {
    this.favsService.removeAlbum(id);
  }

  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiParam({
    name: 'id',
    description: 'Artist ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 201,
    description: 'Returns if artist has been added to the favorites',
  })
  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id', UuidValidationPipe) id: string) {
    this.favsService.addArtist(id);
    return { message: `Artist ${id} added to favorites` };
  }

  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiParam({
    name: 'id',
    description: 'Artist ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 204,
    description: 'Returns if artist has been removed',
  })
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', UuidValidationPipe) id: string) {
    this.favsService.removeArtist(id);
  }
}
