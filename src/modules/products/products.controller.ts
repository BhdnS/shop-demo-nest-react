import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import { ProductsControllerLinks } from '../../types/enums/controllers-links'
import { ProductDto, UpdateProductDto } from './dto'
import { JwtAuthGuard } from '../../guards'

@ApiTags(ApiTagsEnum.PRODUCTS)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller(ProductsControllerLinks.CONTROLLER)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: ProductDto): Promise<ProductDto> {
    return this.productsService.create(dto)
  }

  @Get(`${ProductsControllerLinks.FIND_ALL_BY_CATEGORY}/:id`)
  findAllByCategory(@Param('id', ParseIntPipe) category: number): Promise<ProductDto[] | null> {
    return this.productsService.findAllByCategory(category)
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ProductDto | null> {
    return this.productsService.findOne(id)
  }

  @Patch(':id')
  update(@Body() dto: UpdateProductDto): Promise<UpdateProductDto> {
    return this.productsService.update(dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<UpdateProductDto> {
    return this.productsService.remove(id)
  }
}
