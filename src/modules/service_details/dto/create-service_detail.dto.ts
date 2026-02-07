import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber } from "class-validator";

export class CreateServiceDetailDto {
  @ApiProperty({ description: "Xizmat ID", required: false })
  @IsOptional()
  @IsNumber()
  service_id?: number;

  @ApiProperty({ description: "Xizmat nomi", required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: "Xizmat nomi RU", required: false })
  @IsOptional()
  @IsString()
  title_ru?: string;

  @ApiProperty({ description: "Narxi", required: false })
  @IsOptional()
  @IsString()
  price?: string;

  @ApiProperty({ description: "Narxi RU", required: false })
  @IsOptional()
  @IsString()
  price_ru?: string;

  @ApiProperty({ description: "Qo‘shimcha ma’lumot", required: false })
  @IsOptional()
  @IsString()
  about?: string;

  @ApiProperty({ description: "Qo‘shimcha ma’lumot RU", required: false })
  @IsOptional()
  @IsString()
  about_ru?: string;

  @ApiProperty({ description: "Rasm URL", required: false })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({ description: "Video URL", required: false })
  @IsOptional()
  @IsString()
  video?: string;
}
