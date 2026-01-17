import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDirectionDto {
  @ApiProperty({ example: 'Cardiology Department' })
  @IsString()
  full_name?: string;

  @ApiProperty({ example: 'Cardiology' })
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Department description' })
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Описание департамента' })
  @IsString()
  description_ru?: string;

  @ApiProperty({ example: 'Кардиология' })
  @IsString()
  title_ru?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  photo?: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  video?: any;
}
