import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 123 })
@IsOptional()
  full_name?: string;

  @ApiProperty({ example: 456 })
  @IsString()
  description?: string;

  @ApiProperty({ example: 789 })
  @IsString()
  description_ru?: string;

  @ApiProperty({ example: 'Service title' })
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Название услуги' })
  @IsString()
  title_ru?: string;

  @ApiProperty({ example: 'Полное название услуги' })
  @IsString()
  full_name_ru?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  photo?: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  video?: any;

  @ApiProperty({ example: 'Full info about service' })
  @IsString()
  about?: string;
}
