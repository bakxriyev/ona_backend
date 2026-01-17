import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { About } from './model/about.entity';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';

@Module({
  imports: [SequelizeModule.forFeature([About])],
  controllers: [AboutController],
  providers: [AboutService],
  exports: [AboutService],
})
export class AboutModule {}
