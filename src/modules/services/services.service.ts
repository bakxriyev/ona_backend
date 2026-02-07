import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './model/service.entity';
import { ServiceDetail } from '../service_details/entities/service_detail.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(@InjectModel(Service) private serviceRepo: typeof Service) {}

  create(data: CreateServiceDto & { photo?: string; video?: string }) {
    return this.serviceRepo.create(data);
  }

  findAll() {
    return this.serviceRepo.findAll({
      include: [
        {
          model: ServiceDetail,
          as: 'details',
        },
      ],
    });
  }

  async findOne(id: number) {
    const service = await this.serviceRepo.findByPk(id, {
      include: [
        {
          model: ServiceDetail,
          as: 'details',
        },
      ],
    });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async update(id: number, data: UpdateServiceDto & { photo?: string; video?: string }) {
    const service = await this.findOne(id);
    return service.update(data);
  }

  async remove(id: number) {
    const service = await this.findOne(id);
    return service.destroy();
  }
}