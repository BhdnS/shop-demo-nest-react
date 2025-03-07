import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import { CategoriesControllerLinks } from '../../types/enums/controllers-links'

@ApiTags(ApiTagsEnum.CATEGORIES)
@Controller(CategoriesControllerLinks.CONTROLLER)
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
