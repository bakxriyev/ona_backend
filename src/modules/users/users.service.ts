import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./model/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async create(dto: CreateUserDto, photo: string) {
    return await this.userRepo.create({
      ...dto,
      photo,
    });
  }

  async findAll() {
    return await this.userRepo.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findByPk(id);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async update(id: number, dto: UpdateUserDto, photo?: string) {
    const user = await this.findOne(id);

    if (photo) user.photo = photo;

    await user.update({ ...dto });
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await user.destroy();
    return { message: "User deleted" };
  }
}
