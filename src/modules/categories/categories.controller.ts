import { Controller, Get, Post, Patch, Delete, Body, Req, Param } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import { CategoriesControllerLinks } from '../../types/enums/controllers-links'
import { CategoryDto, UpdateCategoryDto } from './dto'
import { Request } from 'express'

@ApiTags(ApiTagsEnum.CATEGORIES)
@Controller(CategoriesControllerLinks.CONTROLLER)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() dto: CategoryDto, @Req() req: Request): Promise<CategoryDto> {
    return this.categoriesService.create(dto, req)
  }

  @Get()
  findAll(): Promise<CategoryDto[]> {
    return this.categoriesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CategoryDto | null> {
    return this.categoriesService.findOne(id)
  }

  @Patch(':id')
  update(@Body() dto: UpdateCategoryDto): Promise<CategoryDto> {
    return this.categoriesService.update(dto)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<CategoryDto> {
    return this.categoriesService.remove(id)
  }
}
