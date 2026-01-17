import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { DirectionService } from './direction.service';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';

@ApiTags('Direction')
@Controller('direction')
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/direction',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + extname(file.originalname));
          },
        }),
      },
    ),
  )
  create(
    @Body() dto: CreateDirectionDto,
    @UploadedFiles() files: { photo?: Express.Multer.File[]; video?: Express.Multer.File[] },
  ) {
    return this.directionService.create({
      ...dto,
      photo: files?.photo?.[0]?.filename,
      video: files?.video?.[0]?.filename,
    });
  }

  @Get()
  findAll() {
    return this.directionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.directionService.findOne(+id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/direction',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + extname(file.originalname));
          },
        }),
      },
    ),
  )
  update(
    @Param('id') id: number,
    @Body() dto: UpdateDirectionDto,
    @UploadedFiles() files: { photo?: Express.Multer.File[]; video?: Express.Multer.File[] },
  ) {
    return this.directionService.update(+id, {
      ...dto,
      photo: files?.photo?.[0]?.filename,
      video: files?.video?.[0]?.filename,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.directionService.delete(+id);
  }
}
