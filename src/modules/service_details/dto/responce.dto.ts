import { ApiProperty } from "@nestjs/swagger";

export class ServiceDetailResponseDto {
  @ApiProperty({ description: "ID" })
  id: number;

  @ApiProperty({ description: "Xizmat ID", required: false })
  service_id?: number;

  @ApiProperty({ description: "Xizmat nomi", required: false })
  title?: string;

  @ApiProperty({ description: "Xizmat nomi RU", required: false })
  title_ru?: string;

  @ApiProperty({ description: "Narxi", required: false })
  price?: string;

  @ApiProperty({ description: "Narxi RU", required: false })
  price_ru?: string;

  @ApiProperty({ description: "Qo‘shimcha ma’lumot", required: false })
  about?: string;

  @ApiProperty({ description: "Qo‘shimcha ma’lumot RU", required: false })
  about_ru?: string;

  @ApiProperty({ description: "Rasm URL", required: false })
  photo?: string;

  @ApiProperty({ description: "Video URL", required: false })
  video?: string;
}
