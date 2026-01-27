import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Ali Valiyev' })
  @IsOptional()
  full_name: string;

  @ApiProperty({ example: '998901234567' })
  @IsOptional()
  phone_number: number;

  @ApiPropertyOptional({ example: 'photo.jpg' })
  @IsOptional()
  photo?: string;

  @ApiProperty({ example: 'Stomatologiya' })
  @IsOptional()
  department: string;

  @ApiPropertyOptional({ example: 'Dr. Karimov' })
  @IsOptional()
  doctor_name?: string;

  @ApiPropertyOptional({ example: 'Tish og‘riyapti' })
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({ example: '2026-02-01' })
  @IsOptional()
  appointment_date?: Date;

  @ApiPropertyOptional({ example: '14:30' })
  @IsOptional()
  appointment_time?: string;
}
