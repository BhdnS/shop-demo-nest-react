import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductsService {
  create() {
    return 'This action adds a new product'
  }

  findAll() {
    return `This action returns all products`
  }

  findOne() {
    return `This action returns a #id product`
  }

  update() {
    return `This action updates a #id product`
  }

  remove() {
    return `This action removes a #id product`
  }
}
