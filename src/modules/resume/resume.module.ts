import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Resume } from './model/resume.entity';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';

@Module({
  imports: [SequelizeModule.forFeature([Resume])],
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [ResumeService],
})
export class ResumeModule {}
