import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateAboutDto {
  @ApiPropertyOptional({ type: String, description: 'Full name' })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiPropertyOptional({ type: String, description: 'Description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ type: String, description: 'Title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ type: String, description: 'Description in RU' })
  @IsOptional()
  @IsString()
  description_ru?: string;

  @ApiPropertyOptional({ type: String, description: 'Title in RU' })
  @IsOptional()
  @IsString()
  title_ru?: string;

  // File upload (logo) will be sent in multipart/form-data, so here we accept any
  @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Logo image (file)' })
  @IsOptional()
  logo?: any;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @IsEmail()
  gmail?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  manzil?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  manzil_ru?: string;
}
