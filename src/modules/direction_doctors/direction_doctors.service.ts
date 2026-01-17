import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DirectionDoctors } from './model/direction_doctor.entity';
import { CreateDirectionDoctorDto } from './dto/create-direction_doctor.dto'
import { UpdateDirectionDoctorDto } from './dto/update-direction_doctor.dto';

@Injectable()
export class DirectionDoctorsService {
  constructor(
    @InjectModel(DirectionDoctors)
    private readonly directionDoctorsRepo: typeof DirectionDoctors
  ) {}

  create(data: CreateDirectionDoctorDto & { photo?: string; video?: string }) {
    return this.directionDoctorsRepo.create(data);
  }

  findAll() {
    return this.directionDoctorsRepo.findAll({ include: ['doctor', 'direction'] });
  }

  async findOne(id: number) {
    const record = await this.directionDoctorsRepo.findByPk(id, { include: ['doctor', 'direction'] });
    if (!record) throw new NotFoundException('DirectionDoctor record not found');
    return record;
  }

  async update(id: number, data: UpdateDirectionDoctorDto & { photo?: string; video?: string }) {
    const record = await this.findOne(id);
    return record.update(data);
  }

  async delete(id: number) {
    const record = await this.findOne(id);
    return record.destroy();
  }
}
