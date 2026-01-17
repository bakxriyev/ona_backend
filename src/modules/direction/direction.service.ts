import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Direction } from './model/direction.entity';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';

@Injectable()
export class DirectionService {
  constructor(@InjectModel(Direction) private directionRepo: typeof Direction) {}

  create(data: CreateDirectionDto & { photo?: string; video?: string }) {
    return this.directionRepo.create(data);
  }

  findAll() {
    return this.directionRepo.findAll();
  }

  async findOne(id: number) {
    const direction = await this.directionRepo.findByPk(id);
    if (!direction) throw new NotFoundException('Direction not found');
    return direction;
  }

  async update(id: number, data: UpdateDirectionDto & { photo?: string; video?: string }) {
    const direction = await this.findOne(id);
    return direction.update(data);
  }

  async delete(id: number) {
    const direction = await this.findOne(id);
    return direction.destroy();
  }
}
