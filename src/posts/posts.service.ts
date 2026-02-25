import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Post } from './entities/post.entity';
import { Category } from '../categories/entities/category.entity';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(published?: boolean, categoryId?: number): Promise<Post[]> {
    const where: FindOptionsWhere<Post> = {};
    if (published !== undefined) where.published = published;
    if (categoryId !== undefined) where.category = { id: categoryId };

    return this.postRepository.find({ where });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) throw new NotFoundException(`Post #${id} not found`);
    return post;
  }

  async create(dto: CreatePostDto): Promise<Post> {
    const category = await this.categoryRepository.findOneBy({
      id: dto.categoryId,
    });
    if (!category)
      throw new NotFoundException(`Category #${dto.categoryId} not found`);

    const post = this.postRepository.create({ ...dto, category });
    return this.postRepository.save(post);
  }

  async update(id: number, dto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) throw new NotFoundException(`Post #${id} not found`);

    if (dto.categoryId) {
      const category = await this.categoryRepository.findOneBy({
        id: dto.categoryId,
      });
      if (!category)
        throw new NotFoundException(`Category #${dto.categoryId} not found`);
      post.category = category;
    }

    Object.assign(post, dto);
    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) throw new NotFoundException(`Post #${id} not found`);
    await this.postRepository.remove(post);
  }
}
