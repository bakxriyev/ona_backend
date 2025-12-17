// dto/register.dto.ts
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Kamron Bahriyev' })
  @IsString()
  full_name: string;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 998901234567, required: false })
  @IsOptional()
  phone_number?: number;

  @ApiProperty({ example: 'admin12345' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'superadmin', required: false })
  @IsOptional()
  role?: string;

  @ApiProperty({ example: 'adminuser' })
  @IsOptional()
  @IsString()
  username?: string;
}
