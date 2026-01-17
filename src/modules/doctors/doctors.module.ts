import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './model/doctor.entity';
import { DoctorService } from './doctors.service'
import { DoctorController } from './doctors.controller'

@Module({
  imports: [SequelizeModule.forFeature([Doctor])],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}
