import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer"
import { extname } from 'path';

import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

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
          destination: './uploads/blog',
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + extname(file.originalname));
          },
        }),
      },
    ),
  )
  async create(
    @Body() dto: CreateBlogDto,
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
  ) {
    return this.blogService.create({
      ...dto,
      photo: files?.photo?.[0]?.filename,
      video: files?.video?.[0]?.filename,
    });
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogService.findOne(+id);
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
          destination: './uploads/blog',
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + extname(file.originalname));
          },
        }),
      },
    ),
  )
  update(
    @Param('id') id: number,
    @Body() dto: UpdateBlogDto,
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
  ) {
    return this.blogService.update(+id, {
      ...dto,
      photo: files?.photo?.[0]?.filename,
      video: files?.video?.[0]?.filename,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.blogService.delete(+id);
  }
}
