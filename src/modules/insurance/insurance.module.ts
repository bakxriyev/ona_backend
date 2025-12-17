import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Insurance } from './model/insurance.entity';
import { InsuranceService } from './insurance.service';
import { InsuranceController } from './insurance.controller';

@Module({
  imports: [SequelizeModule.forFeature([Insurance])],
  controllers: [InsuranceController],
  providers: [InsuranceService],
})
export class InsuranceModule {}
