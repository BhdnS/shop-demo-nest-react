import { Injectable } from '@nestjs/common'

@Injectable()
export class NovaPoshtaService {
  create() {
    return 'This action adds a new novaPoshta'
  }

  findAll() {
    return `This action returns all novaPoshta`
  }

  findOne() {
    return `This action returns a #id novaPoshta`
  }

  update() {
    return `This action updates a #id novaPoshta`
  }

  remove() {
    return `This action removes a #id novaPoshta`
  }
}
