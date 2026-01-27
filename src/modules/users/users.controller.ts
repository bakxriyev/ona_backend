import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  Res
} from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

import { Response } from 'express';


@ApiTags('Clinic Requests')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  // 📋 Pagination + sort + filter
  @Get()
  findAll(@Query() query: QueryUserDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
  // 📊 Excel export
@Get('export/excel')
exportToExcel(
  @Query() query: QueryUserDto,
  @Res() res: Response,
) {
  return this.usersService.exportToExcel(query, res);
}

}
