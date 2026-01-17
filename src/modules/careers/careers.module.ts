import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Career } from './model/career.entity';
import { CareersService } from './careers.service';
import { CareerController } from './careers.controller';

@Module({
  imports: [SequelizeModule.forFeature([Career])],
  controllers: [CareerController],
  providers: [CareersService],
})
export class CareerModule {}
