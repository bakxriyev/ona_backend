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
import { InsuranceService } from './insurance.service';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';

@ApiTags('Insurance')
@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

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
          destination: './uploads/insurance',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + extname(file.originalname));
          },
        }),
      },
    ),
  )
  create(
    @Body() dto: CreateInsuranceDto,
    @UploadedFiles() files: { photo?: Express.Multer.File[]; video?: Express.Multer.File[] },
  ) {
    return this.insuranceService.create({
      ...dto,
      photo: files?.photo?.[0]?.filename,
      video: files?.video?.[0]?.filename,
    });
  }

  @Get()
  findAll() {
    return this.insuranceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.insuranceService.findOne(+id);
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
          destination: './uploads/insurance',
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
    @Body() dto: UpdateInsuranceDto,
    @UploadedFiles() files: { photo?: Express.Multer.File[]; video?: Express.Multer.File[] },
  ) {
    return this.insuranceService.update(+id, {
      ...dto,
      photo: files?.photo?.[0]?.filename,
      video: files?.video?.[0]?.filename,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.insuranceService.delete(+id);
  }
}
