import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import { ProductsControllerLinks } from '../../types/enums/controllers-links'

@ApiTags(ApiTagsEnum.PRODUCTS)
@Controller(ProductsControllerLinks.CONTROLLER)
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
