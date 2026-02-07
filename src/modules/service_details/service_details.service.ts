import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ServiceDetail } from "./entities/service_detail.entity";

@Injectable()
export class ServiceDetailService {
  constructor(
    @InjectModel(ServiceDetail)
    private readonly serviceDetailModel: typeof ServiceDetail,
  ) {}

  create(data: Partial<ServiceDetail>) {
    return this.serviceDetailModel.create(data);
  }

  findAll() {
    return this.serviceDetailModel.findAll({
      include: ["service"],
    });
  }

  async findOne(id: number) {
    const detail = await this.serviceDetailModel.findByPk(id, {
      include: ["service"],
    });

    if (!detail) {
      throw new NotFoundException("Service detail topilmadi");
    }

    return detail;
  }

  async update(id: number, data: Partial<ServiceDetail>) {
    const detail = await this.findOne(id);
    return detail.update(data);
  }

  async remove(id: number) {
    const detail = await this.findOne(id);
    await detail.destroy();
    return { message: "Service detail o‘chirildi" };
  }
}
