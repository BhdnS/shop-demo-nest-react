import { Controller, Get, Query } from '@nestjs/common'
import { NovaPoshtaService } from './nova-poshta.service'
import { ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import { NovaPoshtaControllerLinks } from '../../types/enums/controllers-links'
import { BranchResponseDto } from './response'

@ApiTags(ApiTagsEnum.NOVA_POSHTA)
@Controller(NovaPoshtaControllerLinks.CONTROLLER)
export class NovaPoshtaController {
  constructor(private readonly novaPoshtaService: NovaPoshtaService) {}

  @Get()
  getBranches(@Query('city') city: string): Promise<BranchResponseDto[]> {
    return this.novaPoshtaService.getBranches(city)
  }
}
