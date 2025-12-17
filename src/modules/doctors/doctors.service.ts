import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './model/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor) private doctorRepo: typeof Doctor) {}

  create(data: CreateDoctorDto & { photo?: string; video?: string }) {
    return this.doctorRepo.create(data);
  }

  findAll() {
    return this.doctorRepo.findAll({ include: ['directionDoctors'] });
  }

  async findOne(id: number) {
    const doctor = await this.doctorRepo.findByPk(id, { include: ['directionDoctors'] });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async update(id: number, data: UpdateDoctorDto & { photo?: string; video?: string }) {
    const doctor = await this.findOne(id);
    return doctor.update(data);
  }

  async delete(id: number) {
    const doctor = await this.findOne(id);
    return doctor.destroy();
  }
}
