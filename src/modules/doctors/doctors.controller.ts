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
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { DoctorService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

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
          destination: './uploads/doctor',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + extname(file.originalname));
          },
        }),
      },
    ),
  )
  create(
    @Body() dto: CreateDoctorDto,
    @UploadedFiles() files: { photo?: Express.Multer.File[]; video?: Express.Multer.File[] },
  ) {
    return this.doctorService.create({
      ...dto,
      photo: files?.photo?.[0]?.filename,
      video: files?.video?.[0]?.filename,
    });
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.doctorService.findOne(+id);
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
          destination: './uploads/doctor',
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
    @Body() dto: UpdateDoctorDto,
    @UploadedFiles() files: { photo?: Express.Multer.File[]; video?: Express.Multer.File[] },
  ) {
    return this.doctorService.update(+id, {
      ...dto,
      photo: files?.photo?.[0]?.filename,
      video: files?.video?.[0]?.filename,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.doctorService.delete(+id);
  }
}
