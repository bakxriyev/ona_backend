import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Resume } from './model/resume.entity';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Injectable()
export class ResumeService {
  constructor(@InjectModel(Resume) private resumeRepo: typeof Resume) {}

  create(data: CreateResumeDto & { photo?: string }) {
    return this.resumeRepo.create(data);
  }

  findAll() {
    return this.resumeRepo.findAll();
  }

  async findOne(id: number) {
    const resume = await this.resumeRepo.findByPk(id);
    if (!resume) throw new NotFoundException('Resume not found');
    return resume;
  }

  async update(id: number, data: UpdateResumeDto & { photo?: string }) {
    const resume = await this.findOne(id);
    return resume.update(data);
  }

  async remove(id: number) {
    const resume = await this.findOne(id);
    return resume.destroy();
  }
}
