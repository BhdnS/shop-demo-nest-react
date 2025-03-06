import { Injectable } from '@nestjs/common'

@Injectable()
export class OrdersService {
  create() {
    return 'This action adds a new order'
  }

  findAll() {
    return `This action returns all orders`
  }

  findOne() {
    return `This action returns a #id order`
  }

  update() {
    return `This action updates a #id order`
  }

  remove() {
    return `This action removes a #id order`
  }
}
