import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Blog } from './model/blog.entity';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

@Module({
  imports: [SequelizeModule.forFeature([Blog])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
