import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCareerDto {
@ApiProperty({ example: 'Career title' })
@IsString()
title?: string;

@ApiProperty({ example: 'Career title in Russian' })
@IsString()
title_ru?: string;

@ApiProperty({ example: 'Career description' })
@IsString()
description?: string;

@ApiProperty({ example: 'Career description in Russian' })
@IsString()
description_ru?: string;

@ApiProperty({ example: 'Vacancy details' })
@IsString()
vacancy?: string;

@ApiProperty({ type: 'string', format: 'binary', required: false })
@IsOptional()
photo?: any;

@ApiProperty({ type: 'string', format: 'binary', required: false })
@IsOptional()
video?: any;
}