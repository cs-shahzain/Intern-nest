import { Injectable, NotFoundException } from '@nestjs/common';
import { createProductDto } from './dto/createProduct.dto';
import { updateProductDto } from './dto/updateProduct.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private counter = 1;

  findAll(category?: string): Product[] {
    if (category) {
      return this.products.filter((p) => p.category === category);
    }
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  create(createProductDto: createProductDto): Product {
    const newProduct: Product = {
      id: this.counter++,
      ...createProductDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, updateProductDto: updateProductDto): Product {
    const product = this.findOne(id);
    Object.assign(product, updateProductDto);
    return product;
  }
  delete(id: number): void {
    const index = this.products.findIndex((p) => p.id === id);
    if (index == -1)
      throw new NotFoundException(`Product with id ${id} not found`);
    this.products.splice(index, 1);
  }
}
