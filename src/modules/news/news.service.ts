import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './model/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News) private newsRepo: typeof News) {}

  create(data: CreateNewsDto & { photo?: string; video?: string }) {
    return this.newsRepo.create(data);
  }

  findAll() {
    return this.newsRepo.findAll();
  }

  async findOne(id: number) {
    const news = await this.newsRepo.findByPk(id);
    if (!news) throw new NotFoundException('News not found');
    return news;
  }
  

  async update(id: number, data: UpdateNewsDto & { photo?: string; video?: string }) {
    const news = await this.findOne(id);
    return news.update(data);
  }

  async delete(id: number) {
    const news = await this.findOne(id);
    return news.destroy();
  }
}
