import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiConsumes, ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { Express } from 'express';


@ApiTags('about')
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post()
  @ApiOperation({ summary: 'Create about (with optional logo upload)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create About DTO',
    schema: {
      type: 'object',
      properties: {
        full_name: { type: 'string' },
        description: { type: 'string' },
        title: { type: 'string' },
        description_ru: { type: 'string' },
        title_ru: { type: 'string' },
        gmail: { type: 'string' },
        manzil: { type: 'string' },
        manzil_ru: { type: 'string' },
        logo: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/about',
        filename: (_req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          cb(null, `${uniqueSuffix}${fileExtName}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        // accept images only (png/jpg/jpeg) - adjust if you want video too
        const allowed = /png|jpg|jpeg|gif/;
        const ext = extname(file.originalname).toLowerCase();
        if (allowed.test(ext)) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      },
    }),
  )
  create(@Body() dto: CreateAboutDto, @UploadedFile() file?: Express.Multer.File) {
    return this.aboutService.create(dto, file?.filename);
  }

  @Get()
  findAll() {
    return this.aboutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.aboutService.findOne(id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/about',
        filename: (_req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          cb(null, `${uniqueSuffix}${fileExtName}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAboutDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.aboutService.update(id, dto, file?.filename);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.aboutService.remove(id);
  }
}
