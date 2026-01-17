import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Career } from './model/career.entity';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';

@Injectable()
export class CareersService {
  constructor(@InjectModel(Career) private careerRepo: typeof Career) {}

  create(data: CreateCareerDto & { photo?: string; video?: string }) {
    return this.careerRepo.create(data);
  }

  findAll() {
    return this.careerRepo.findAll();
  }

  async findOne(id: number) {
    const career = await this.careerRepo.findByPk(id);
    if (!career) throw new NotFoundException('Career not found');
    return career;
  }

  async update(id: number, data: UpdateCareerDto & { photo?: string; video?: string }) {
    const career = await this.findOne(id);
    return career.update(data);
  }

  async remove(id: number) {
    const career = await this.findOne(id);
    return career.destroy();
  }
}
