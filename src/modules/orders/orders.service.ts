import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common'
import PrismaService from '../prisma'
import { OrderDto, UpdateOrderDto } from './dto'
import { TokenService } from '../token/token.service'
import { Request } from 'express'
import { Order } from '@prisma/client'

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService
  ) {}

  async create(dto: OrderDto, req: Request): Promise<Order> {
    const accessToken = req.headers.authorization

    if (!accessToken) throw new BadRequestException(HttpStatus.UNAUTHORIZED)

    const { id } = await this.tokenService.verifyAccessToken(accessToken)

    return this.prismaService.order.create({
      data: {
        novaPoshtaBranch: dto.novaPoshtaBranch,
        user: id,
        totalPrice: dto.totalPrice,
        products: {
          create: dto.products,
        },
      },
    })
  }

  async findAll(): Promise<Order[]> {
    return this.prismaService.order.findMany()
  }

  async findOne(id: number): Promise<Order | null> {
    return this.prismaService.order.findUnique({ where: { id: id } })
  }

  async update(dto: UpdateOrderDto): Promise<Order> {
    return this.prismaService.order.update({
      where: { id: dto.id },
      data: {
        novaPoshtaBranch: dto.novaPoshtaBranch,
        totalPrice: dto.totalPrice,
        products: {
          create: dto.products,
        },
      },
    })
  }

  async remove(id: number): Promise<Order> {
    return this.prismaService.order.delete({ where: { id: id } })
  }
}
