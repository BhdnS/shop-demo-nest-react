import { Controller, Get, Post, Patch, Delete, Body, Req, Param, UseGuards } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import { OrdersControllerLinks } from '../../types/enums/controllers-links'
import { OrderDto, UpdateOrderDto } from './dto'
import { Request } from 'express'
import { Order } from '@prisma/client'
import { JwtAuthGuard } from '../../guards'

@ApiTags(ApiTagsEnum.ORDERS)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller(OrdersControllerLinks.CONTROLLER)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: OrderDto, @Req() req: Request): Promise<Order> {
    return this.ordersService.create(dto, req)
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Order | null> {
    return this.ordersService.findOne(id)
  }

  @Patch(':id')
  update(@Body() dto: UpdateOrderDto): Promise<Order> {
    return this.ordersService.update(dto)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Order> {
    return this.ordersService.remove(id)
  }
}
