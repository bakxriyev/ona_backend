import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { User } from './model/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

import * as ExcelJS from 'exceljs';
import { Response } from 'express';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(dto: CreateUserDto) {
    return this.userModel.create(dto as any);
  }

  async findAll(query: QueryUserDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      search,
      department,
    } = query;

    const offset = (page - 1) * limit;

    const where: any = {};

    // 🔍 search
    if (search) {
      where[Op.or] = [
        { full_name: { [Op.iLike]: `%${search}%` } },
        { phone_number: { [Op.iLike]: `%${search}%` } },
      ];
    }

    // 🏥 filter
    if (department) {
      where.department = department;
    }

    const { rows, count } = await this.userModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sortBy, sortOrder]],
    });

    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('Zayavka topilmadi');
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    return user.update(dto);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await user.destroy();
    return { message: 'Zayavka o‘chirildi' };
  }

  async exportToExcel(query: QueryUserDto, res: Response) {
  const {
    search,
    department,
    sortBy = 'createdAt',
    sortOrder = 'DESC',
  } = query;

  const where: any = {};

  if (search) {
    where[Op.or] = [
      { full_name: { [Op.iLike]: `%${search}%` } },
      { phone_number: { [Op.iLike]: `%${search}%` } },
    ];
  }

  if (department) {
    where.department = department;
  }

  const data = await this.userModel.findAll({
    where,
    order: [[sortBy, sortOrder]],
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Clinic Requests');

  // 🧾 Columnlar
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 8 },
    { header: 'Ism Familiya', key: 'full_name', width: 25 },
    { header: 'Telefon', key: 'phone_number', width: 18 },
    { header: 'Yo‘nalish', key: 'department', width: 20 },
    { header: 'Shifokor', key: 'doctor_name', width: 20 },
    { header: 'Shikoyat', key: 'message', width: 30 },
    { header: 'Sana', key: 'appointment_date', width: 15 },
    { header: 'Vaqt', key: 'appointment_time', width: 12 },
    { header: 'Yaratilgan', key: 'createdAt', width: 20 },
  ];

  // 🔥 Header style
  worksheet.getRow(1).font = { bold: true };

  // 📥 Data
  data.forEach((item) => {
    worksheet.addRow({
      id: item.id,
      full_name: item.full_name,
      phone_number: item.phone_number,
      department: item.department,
      doctor_name: item.doctor_name || '-',
      message: item.message || '-',
      appointment_date: item.appointment_date
        ? item.appointment_date.toISOString().split('T')[0]
        : '-',
      appointment_time: item.appointment_time || '-',
      createdAt: item.createdAt.toISOString(),
    });
  });

  // 📤 Response
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=clinic_requests.xlsx',
  );

  await workbook.xlsx.write(res);
  res.end();
}

}
