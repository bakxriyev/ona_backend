import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Direction } from './model/direction.entity';
import { DirectionService } from './direction.service';
import { DirectionController } from './direction.controller';

@Module({
  imports: [SequelizeModule.forFeature([Direction])],
  controllers: [DirectionController],
  providers: [DirectionService],
  exports: [DirectionService],
})
export class DirectionModule {}
