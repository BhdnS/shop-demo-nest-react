import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { NovaPoshtaService } from './nova-poshta.service'
import { ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import { NovaPoshtaControllerLinks } from '../../types/enums/controllers-links'

@ApiTags(ApiTagsEnum.NOVA_POSHTA)
@Controller(NovaPoshtaControllerLinks.CONTROLLER)
export class NovaPoshtaController {
  constructor(private readonly novaPoshtaService: NovaPoshtaService) {}

  @Post()
  create() {
    return this.novaPoshtaService.create()
  }

  @Get()
  findAll() {
    return this.novaPoshtaService.findAll()
  }

  @Get(':id')
  findOne() {
    return this.novaPoshtaService.findOne()
  }

  @Patch(':id')
  update() {
    return this.novaPoshtaService.update()
  }

  @Delete(':id')
  remove() {
    return this.novaPoshtaService.remove()
  }
}
