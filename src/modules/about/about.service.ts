import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { About } from './model/about.entity';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(About)
    private readonly aboutModel: typeof About,
  ) {}

  async create(dto: CreateAboutDto, logoFilename?: string) {
    const payload: any = { ...dto };
    if (logoFilename) payload.logo = logoFilename;
    const created = await this.aboutModel.create(payload);
    return created;
  }

  async findAll() {
    return this.aboutModel.findAll();
  }

  async findOne(id: number) {
    const found = await this.aboutModel.findByPk(id);
    if (!found) throw new NotFoundException(`About with id ${id} not found`);
    return found;
  }

  async update(id: number, dto: UpdateAboutDto, logoFilename?: string) {
    const about = await this.findOne(id);
    const payload: any = { ...dto };
    if (logoFilename) payload.logo = logoFilename;
    await about.update(payload);
    return about;
  }

  async remove(id: number) {
    const about = await this.findOne(id);
    await about.destroy();
    return { deleted: true };
  }
}
