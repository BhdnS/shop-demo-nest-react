import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create() {
    return this.productsService.create()
  }

  @Get()
  findAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  findOne() {
    return this.productsService.findOne()
  }

  @Patch(':id')
  update() {
    return this.productsService.update()
  }

  @Delete(':id')
  remove() {
    return this.productsService.remove()
  }
}
