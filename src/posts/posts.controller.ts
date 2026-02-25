import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  Controller,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(
    @Query('published') published: string,
    @Query('categoryId') categoryId: string,
  ) {
    const pub = published !== undefined ? published === 'true' : undefined;
    const cat = categoryId ? +categoryId : undefined;
    return this.postsService.findAll(pub, cat);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(+id);
  }
}
