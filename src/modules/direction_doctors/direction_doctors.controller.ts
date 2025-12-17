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
import { DirectionDoctorsService } from './direction_doctors.service';
import { CreateDirectionDoctorDto } from './dto/create-direction_doctor.dto'
import { UpdateDirectionDoctorDto } from './dto/update-direction_doctor.dto';

@ApiTags('DirectionDoctors')
@Controller('direction-doctors')
export class DirectionDoctorsController {
  constructor(private readonly directionDoctorsService: DirectionDoctorsService) {}

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
          destination: './uploads/direction-doctors',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + extname(file.originalname));
          },
        }),
      },
    ),
  )
  create(
    @Body() dto: CreateDirectionDoctorDto,
    @UploadedFiles() files: { photo?: Express.Multer.File[], video?: Express.Multer.File[] },
  ) {
    return this.directionDoctorsService.create({
      ...dto,
      photo: files?.photo?.[0]?.filename,
      video: files?.video?.[0]?.filename,
    });
  }

  @Get()
  findAll() {
    return this.directionDoctorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.directionDoctorsService.findOne(+id);
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
          destination: './uploads/direction-doctors',
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
    @Body() dto: UpdateDirectionDoctorDto,
    @UploadedFiles() files: { photo?: Express.Multer.File[], video?: Express.Multer.File[] },
  ) {
    return this.directionDoctorsService.update(+id, {
      ...dto,
      photo: files?.photo?.[0]?.filename,
      video: files?.video?.[0]?.filename,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.directionDoctorsService.delete(+id);
  }
}
