import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServiceDetail } from "./entities/service_detail.entity";
import { ServiceDetailController } from "../service_details/service_details.controller";
import { ServiceDetailService } from "./service_details.service";
import { Service } from "../services/model/service.entity";

@Module({
  imports: [
    SequelizeModule.forFeature([ServiceDetail, Service]),
  ],
  controllers: [ServiceDetailController],
  providers: [ServiceDetailService],
  exports: [ServiceDetailService],
})
export class ServiceDetailModule {}
