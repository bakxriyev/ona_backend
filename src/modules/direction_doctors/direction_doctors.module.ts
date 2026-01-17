import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DirectionDoctors } from './model/direction_doctor.entity'
import { DirectionDoctorsService } from './direction_doctors.service'
import { DirectionDoctorsController } from './direction_doctors.controller'

@Module({
  imports: [SequelizeModule.forFeature([DirectionDoctors])],
  controllers: [DirectionDoctorsController],
  providers: [DirectionDoctorsService],
  exports: [DirectionDoctorsService],
})
export class DirectionDoctorsModule {}
