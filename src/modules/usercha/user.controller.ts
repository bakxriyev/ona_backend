import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { 
  ApiBearerAuth, 
  ApiOperation, 
  ApiTags, 
  ApiQuery,
  ApiResponse 
} from '@nestjs/swagger';
import { UserchaService } from './user.service';
import { Usercha } from './models/user.model';
import { CreateUserchaDto } from './dtos/create-user.dto';
import { UpdateUserchaDto } from './dtos/update-user.dto';
import { GetUsersQueryDto } from './dtos/query-dto'

@ApiTags('Userscha')
@ApiBearerAuth()
@Controller('userscha')
export class UserchaController {
  constructor(private readonly userService: UserchaService) {}

  // ✅ 1. Barcha userlarni pagination bilan olish
  @ApiOperation({ 
    summary: 'Hamma userlarni pagination bilan olish',
    description: 'Page, limit, address filter va search qo\'llab-quvvatlanadi'
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'address', required: false, enum: ['a', 'b'] })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns paginated users with total count',
    schema: {
      example: {
        users: [],
        total: 100,
        page: 1,
        limit: 10,
        totalPages: 10
      }
    }
  })
  @Get()
  async getAllUsers(@Query() query: GetUsersQueryDto): Promise<{ 
    users: Usercha[], 
    total: number, 
    page: number, 
    limit: number,
    totalPages: number 
  }> {
    return this.userService.getAllUsers(query);
  }

  // ✅ 2. Faqat "a" address'li userlarni olish
  @ApiOperation({ summary: 'Faqat "a" address\'li userlarni olish' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Get('address-a')
  async getUsersByAddressA(@Query() query: GetUsersQueryDto): Promise<{ 
    users: Usercha[], 
    total: number, 
    page: number, 
    limit: number 
  }> {
    return this.userService.getUsersByAddressA(query);
  }

  // ✅ 3. Faqat "b" address'li userlarni olish
  @ApiOperation({ summary: 'Faqat "b" address\'li userlarni olish' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @Get('address-b')
  async getUsersByAddressB(@Query() query: GetUsersQueryDto): Promise<{ 
    users: Usercha[], 
    total: number, 
    page: number, 
    limit: number 
  }> {
    return this.userService.getUsersByAddressB(query);
  }

  // ✅ 4. Eng yangi userlarni olish
  @ApiOperation({ summary: 'Eng yangi 10 ta userni olish' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Max: 50' })
  @Get('latest')
  async getLatestUsers(@Query('limit') limit: number = 10): Promise<Usercha[]> {
    // Limitni cheklash
    const safeLimit = Math.min(Math.max(1, limit), 50);
    return this.userService.getLatestUsers(safeLimit);
  }

  // ✅ 5. Telefon raqami bo'yicha qidirish
  @ApiOperation({ summary: 'Telefon raqami bo\'yicha userlarni qidirish' })
  @ApiQuery({ name: 'phone', required: true, type: String })
  @Get('search/phone')
  async searchUsersByPhone(@Query('phone') phone: string): Promise<Usercha[]> {
    return this.userService.searchUsersByPhone(phone);
  }

  // ✅ 6. Bitta userni ID bo'yicha olish
  @ApiOperation({ summary: 'Yagona userni ID bo\'yicha olish' })
  @Get(':id')
  async getSingleUser(@Param('id', ParseIntPipe) id: number): Promise<Usercha> {
    return this.userService.getSingleUser(id);
  }

  // ✅ 7. Statistik ma'lumotlar
  @ApiOperation({ summary: 'Userlar statistikasi' })
  @Get('stats/summary')
  async getUserStats(): Promise<{
    totalUsers: number,
    addressAUsers: number,
    addressBUsers: number,
    todayRegistrations: number
  }> {
    return this.userService.getUserStats();
  }

  // ✅ 8. Yangi user yaratish
  @ApiOperation({ summary: 'Yangi user yaratish' })
  @Post()
  async createUser(@Body() payload: CreateUserchaDto): Promise<Usercha> {
    return this.userService.createUser(payload);
  }

  // ✅ 9. Userni yangilash
  @ApiOperation({ summary: 'Userni yangilash' })
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserchaDto,
  ): Promise<Usercha> {
    return this.userService.updateUser(id, payload);
  }

  // ✅ 10. Userni o'chirish
  @ApiOperation({ summary: "Userni o'chirish" })
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.userService.deleteUser(id);
  }
}