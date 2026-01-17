import { ApiProperty } from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  full_name?: string;

  @ApiProperty({ example: 998901234567 })
@IsString()
  phone_number?: number;

    @ApiProperty({ example: "johndoe" })
    @IsOptional()
    photo?: any;
}
