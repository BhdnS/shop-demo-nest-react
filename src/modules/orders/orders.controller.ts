import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import { OrdersControllerLinks } from '../../types/enums/controllers-links'

@ApiTags(ApiTagsEnum.ORDERS)
@Controller(OrdersControllerLinks.CONTROLLER)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create() {
    return this.ordersService.create()
  }

  @Get()
  findAll() {
    return this.ordersService.findAll()
  }

  @Get(':id')
  findOne() {
    return this.ordersService.findOne()
  }

  @Patch(':id')
  update() {
    return this.ordersService.update()
  }

  @Delete(':id')
  remove() {
    return this.ordersService.remove()
  }
}
