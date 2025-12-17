import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './model/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog)
    private readonly blogRepo: typeof Blog,
  ) {}

  create(data: CreateBlogDto & { photo?: string; video?: string }) {
    return this.blogRepo.create(data);
  }

  findAll() {
    return this.blogRepo.findAll();
  }

  async findOne(id: number) {
    const blog = await this.blogRepo.findByPk(id);
    if (!blog) {
      throw new NotFoundException('Blog topilmadi');
    }
    return blog;
  }

  async update(
    id: number,
    data: UpdateBlogDto & { photo?: string; video?: string },
  ) {
    const blog = await this.findOne(id);
    return blog.update(data);
  }

  async delete(id: number) {
    const blog = await this.findOne(id);
    return blog.destroy();
  }
}
