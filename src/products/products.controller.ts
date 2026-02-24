import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { createProductDto } from './dto/createProduct.dto';
import { updateProductDto } from './dto/updateProduct.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query('category') category?: string): Product[] {
    return this.productsService.findAll(category);
  }
  /////////////////////////////////

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    return this.productsService.findOne(+id);
  }
  ///////////////////////////////
  @Post()
  @HttpCode(201)
  create(@Body() createProductDto: createProductDto): Product {
    return this.productsService.create(createProductDto);
  }
  /////////////////////////////////////
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: updateProductDto,
  ): Product {
    return this.productsService.update(+id, updateProductDto);
  }
  /////////////////////////////////
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): any {
    return this.productsService.delete(+id);
  }
}
