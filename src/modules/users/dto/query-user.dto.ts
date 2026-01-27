import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryUserDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  limit?: number = 10;

  // sortBy=createdAt | appointment_date | full_name
  @ApiPropertyOptional({ example: 'createdAt' })
  @IsOptional()
  sortBy?: string = 'createdAt';

  // ASC | DESC
  @ApiPropertyOptional({ example: 'DESC' })
  @IsOptional()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';

  // search by name or phone
  @ApiPropertyOptional({ example: 'Ali' })
  @IsOptional()
  search?: string;

  // filter
  @ApiPropertyOptional({ example: 'Stomatologiya' })
  @IsOptional()
  department?: string;
}
