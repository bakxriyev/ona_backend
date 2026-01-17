import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateResumeDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  full_name?: string;

  @ApiProperty({ example: '1990-05-12' })
  @IsString()
  birth_date?: string;

  @ApiProperty({ example: '+998901234567' })
  @IsString()
  phone_number?: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @IsString()
  gmail?: string;

  @ApiProperty({ example: '500$' })
  @IsString()
  maosh?: string;

  @ApiProperty({ example: 'Dasturchi' })
  @IsString()
  lavozim?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  photo?: any;

  @ApiProperty({ example: 'O‘zim haqimda qisqacha…' })
  @IsString()
  about_us?: string;
}
