// auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from '../admin/model/admin.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.adminRepo.findOne({ where: { email: dto.email } });

    if (exists) {
      throw new BadRequestException('Bu email orqali admin mavjud!');
    }

  
    const admin = await this.adminRepo.create({
      ...dto,
      password: dto.password,
    });

    return {
      message: 'Admin muvaffaqiyatli yaratildi',
      admin,
    };
  }

 async login(dto: LoginDto) {
  const admin = await this.adminRepo.findOne({ where: { email: dto.email } });

  if (!admin) throw new UnauthorizedException('Admin topilmadi');

  // === Oddiy parolni tekshirish ===
  if (dto.password !== admin.password) {
    throw new UnauthorizedException('Parol noto‘g‘ri');
  }

  // === Token yaratish ===
  const token = await this.jwtService.signAsync({
    id: admin.id,
    email: admin.email,
    role: admin.role,
  });

  return {
    message: 'Muvaffaqiyatli login qilindi',
    token,
    admin,
  };
}

}
