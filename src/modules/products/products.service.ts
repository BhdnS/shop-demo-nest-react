import { Injectable } from '@nestjs/common'
import PrismaService from '../prisma'
import { ProductDto, UpdateProductDto } from './dto'

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: ProductDto): Promise<ProductDto> {
    return this.prismaService.product.create({
      data: {
        title: dto.title,
        price: dto.price,
        description: dto.description,
        category: dto.category,
        images: dto.images,
      },
    })
  }

  async findAllByCategory(category: number): Promise<ProductDto[] | null> {
    return this.prismaService.product.findMany({ where: { category } })
  }

  async findOne(id: number): Promise<ProductDto | null> {
    return this.prismaService.product.findUnique({ where: { id } })
  }

  async update(dto: UpdateProductDto): Promise<UpdateProductDto> {
    return this.prismaService.product.update({
      where: { id: dto.id },
      data: {
        title: dto.title,
        price: dto.price,
        description: dto.description,
        category: dto.category,
        images: dto.images,
      },
    })
  }

  async remove(id: number): Promise<UpdateProductDto> {
    return this.prismaService.product.delete({ where: { id: id } })
  }
}
