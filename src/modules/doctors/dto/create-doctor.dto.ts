import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  first_name?: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  last_name?: string;

  @ApiProperty({ example: 35 })
  @IsString()
  age?: number;

  @ApiProperty({ example: '5 years' })
  @IsString()
  staji?: string;

  @ApiProperty({ example: 'Medical University' })
  @IsString()
  education?: string;

  @ApiProperty({ example: 'Cardiologist' })
  @IsString()
  specialization?: string;

  @ApiProperty({ example: '5 лет' })
  @IsString()
  staji_ru?: string;

  @ApiProperty({ example: 'Медицинский университет' })
  @IsString()
  education_ru?: string;

  @ApiProperty({ example: 'Кардиолог' })
  @IsString()
  specialization_ru?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  photo?: any;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  video?: any;
}
