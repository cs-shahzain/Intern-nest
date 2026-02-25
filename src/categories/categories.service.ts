import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create.cetagory.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';
import { Post } from '../posts/entities/post.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new NotFoundException(`Category #${id} not found`);
    return category;
  }

  create(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(dto);
    return this.categoryRepository.save(category);
  }

  update(id: number, dto: UpdateCategoryDto): Promise<UpdateResult> {
    return this.categoryRepository.update(id, dto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.categoryRepository.delete(id);
  }

  async getPosts(id: number): Promise<Post[]> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!category) throw new NotFoundException(`Category #${id} not found`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return category.posts;
  }
}
