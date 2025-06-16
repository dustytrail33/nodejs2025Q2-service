import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UuidValidationPipe } from 'src/utils/uuid-validation.pipe';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @ApiOperation({
    summary: 'Get albums',
    description: 'Gets all albums',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all albums',
    isArray: true,
    type: Album,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.albumService.findAll();
  }

  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Get single album by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Album ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns if album record exists',
    type: Album,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', UuidValidationPipe) id: string) {
    return this.albumService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update album',
    description: 'Update album by UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'Album ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns if album has been updated',
    type: Album,
  })
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album',
  })
  @ApiResponse({
    status: 201,
    description: 'Returns if album has been created',
    type: Album,
  })
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateAlbumDto) {
    return this.albumService.create(dto);
  }

  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album',
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
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', UuidValidationPipe) id: string) {
    const removedAlbum = await this.albumService.remove(id);
    if (!removedAlbum) {
      throw new NotFoundException('Album not found');
    }
  }
}
