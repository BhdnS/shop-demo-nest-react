import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common'
import { CategoryDto, UpdateCategoryDto } from './dto'
import PrismaService from '../prisma'
import { Request } from 'express'
import { TokenService } from '../token/token.service'

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService
  ) {}

  async create(dto: CategoryDto, req: Request): Promise<CategoryDto> {
    const accessToken = req.headers.authorization

    if (!accessToken) throw new BadRequestException(HttpStatus.UNAUTHORIZED)

    const { id } = await this.tokenService.verifyAccessToken(accessToken)

    return this.prismaService.category.create({
      data: {
        name: dto.name,
        image: dto.image,
        createdBy: id,
      },
    })
  }

  async findAll(): Promise<CategoryDto[]> {
    return this.prismaService.category.findMany()
  }

  async findOne(id: number): Promise<CategoryDto | null> {
    return this.prismaService.category.findUnique({ where: { id: id } })
  }

  async update(dto: UpdateCategoryDto): Promise<CategoryDto> {
    return this.prismaService.category.update({ where: { id: dto.id }, data: { name: dto.name, image: dto.image } })
  }

  async remove(id: number): Promise<CategoryDto> {
    return this.prismaService.category.delete({ where: { id: id } })
  }
}
