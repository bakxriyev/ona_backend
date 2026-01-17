import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Insurance } from './model/insurance.entity';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';

@Injectable()
export class InsuranceService {
  constructor(@InjectModel(Insurance) private insuranceRepo: typeof Insurance) {}

  create(data: CreateInsuranceDto & { photo?: string; video?: string }) {
    return this.insuranceRepo.create(data);
  }

  findAll() {
    return this.insuranceRepo.findAll();
  }

  async findOne(id: number) {
    const insurance = await this.insuranceRepo.findByPk(id);
    if (!insurance) throw new NotFoundException('Insurance not found');
    return insurance;
  }

  async update(id: number, data: UpdateInsuranceDto & { photo?: string; video?: string }) {
    const insurance = await this.findOne(id);
    return insurance.update(data);
  }

  async delete(id: number) {
    const insurance = await this.findOne(id);
    return insurance.destroy();
  }
}
