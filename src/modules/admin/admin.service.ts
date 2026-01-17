import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './model/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private readonly adminModel: typeof Admin,
  ) {}

  async create(dto: CreateAdminDto) {
    return this.adminModel.create(dto);
  }

  async findAll() {
    return this.adminModel.findAll();
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) throw new NotFoundException(`Admin with id ${id} not found`);
    return admin;
  }

  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    await admin.update(dto);
    return admin;
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    await admin.destroy();
    return { deleted: true };
  }
}
