import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  Body,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags, ApiBody } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { extname } from "path";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ---------------- CREATE ---------------------
  @Post("create")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("photo", {
      storage: diskStorage({
        destination: "./uploads/user",
        filename: (req, file, cb) => {
          cb(null, Date.now() + extname(file.originalname));
        },
      }),
    }),
  )
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        full_name: { type: "string" },
        phone_number: { type: "number" },
        photo: { type: "string", format: "binary" },
      },
    },
  })
  create(@Body() dto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    return this.userService.create(dto, file?.filename);
  }

  // ---------------- FIND ALL ---------------------
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // ---------------- FIND ONE ---------------------
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.userService.findOne(id);
  }

  // ---------------- UPDATE ---------------------
  @Put(":id")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("photo", {
      storage: diskStorage({
        destination: "./uploads/user",
        filename: (req, file, cb) => {
          cb(null, Date.now() + extname(file.originalname));
        },
      }),
    }),
  )
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        full_name: { type: "string" },
        phone_number: { type: "number" },
        photo: { type: "string", format: "binary" },
      },
    },
  })
  update(
    @Param("id") id: number,
    @Body() dto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.update(id, dto, file?.filename);
  }

  // ---------------- DELETE ---------------------
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.userService.remove(id);
  }
}
