import { Body, Controller, Get, Param, Post, Patch, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ServiceDetailService } from "./service_details.service";
import { CreateServiceDetailDto } from "./dto/create-service_detail.dto";
import { UpdateServiceDetailDto } from "./dto/update-service_detail.dto";
import { ServiceDetailResponseDto } from "./dto/responce.dto";

@ApiTags("Service Details")
@Controller("service-details")
export class ServiceDetailController {
  constructor(private readonly serviceDetailService: ServiceDetailService) {}

  @Post()
  @ApiOperation({ summary: "Yangi ServiceDetail yaratish" })
  @ApiResponse({ status: 201, type: ServiceDetailResponseDto })
  create(@Body() body: CreateServiceDetailDto) {
    return this.serviceDetailService.create(body);
  }

  @Get()
  @ApiOperation({ summary: "Barcha ServiceDetail larni olish" })
  @ApiResponse({ status: 200, type: [ServiceDetailResponseDto] })
  findAll() {
    return this.serviceDetailService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta ServiceDetail ni olish" })
  @ApiResponse({ status: 200, type: ServiceDetailResponseDto })
  findOne(@Param("id") id: string) {
    return this.serviceDetailService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "ServiceDetail ni yangilash" })
  @ApiResponse({ status: 200, type: ServiceDetailResponseDto })
  update(@Param("id") id: string, @Body() body: UpdateServiceDetailDto) {
    return this.serviceDetailService.update(+id, body);
  }

  @Delete(":id")
  @ApiOperation({ summary: "ServiceDetail ni o‘chirish" })
  @ApiResponse({ status: 200, description: "ServiceDetail o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.serviceDetailService.remove(+id);
  }
}
