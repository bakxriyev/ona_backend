import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  photo?: any;

  @ApiProperty({ example: 'News description' })
  @IsString()
  description?: string;

  @ApiProperty({ example: 'News title' })
  @IsString()
  title?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  video?: any;

  @ApiProperty({ example: 123 })
  @IsString()
  matn?: number;

  @ApiProperty({ example: 'Описание новости' })
  @IsString()
  description_ru?: string;

  @ApiProperty({ example: 'Заголовок новости' })
  @IsString()
  title_ru?: string;

  @ApiProperty({ example: 'Текст новости' })
  @IsString()
  matn_ru?: string;

  @ApiProperty({ example: '2025-11-28' })
  @IsString()
  date?: string;
}
