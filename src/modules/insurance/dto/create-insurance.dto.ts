import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateInsuranceDto {
  @ApiProperty({ example: 123 })
  @IsString()
  full_name?: number;

  @ApiProperty({ example: 'Insurance Title' })
  @IsString()
  title?: string;

  @ApiProperty({ example: 456 })
  @IsString()
  description?: number;

  @ApiProperty({ example: 'Insurance details' })
  @IsString()
  about_insurance?: string;

  @ApiProperty({ example: 'Название страховки' })
  @IsString()
  title_ru?: string;

  @ApiProperty({ example: 'Описание страховки' })
  @IsString()
  description_ru?: string;

  @ApiProperty({ example: 'Подробности страховки' })
  @IsString()
  about_insurance_ru?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  photo?: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  video?: any;
}
