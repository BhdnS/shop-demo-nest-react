import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { CategoriesService } from './categories.service'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create() {
    return this.categoriesService.create()
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll()
  }

  @Get(':id')
  findOne() {
    return this.categoriesService.findOne()
  }

  @Patch(':id')
  update() {
    return this.categoriesService.update()
  }

  @Delete(':id')
  remove() {
    return this.categoriesService.remove()
  }
}
