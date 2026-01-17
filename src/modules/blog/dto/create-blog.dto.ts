import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
@ApiProperty({ example: 'Blog nomi' })
@IsString()
title?: string;

@ApiProperty({ example: 'Blog tavsifi' })
@IsString()
description?: string;

@ApiProperty({ example: 'Блог название' })
@IsString()
title_ru?: string;

@ApiProperty({ example: 'Описание блога' })
@IsString()
description_ru?: string;

@ApiProperty({ example: 'maqola matni' })
@IsString()
maqola?: string;

// ================= FILE UPLOADS (SWAGGER UCHUN) ================
@ApiProperty({ type: 'string', format: 'binary', required: false })
@IsOptional()
photo?: any;

@ApiProperty({ type: 'string', format: 'binary', required: false })
@IsOptional()
video?: any;
}