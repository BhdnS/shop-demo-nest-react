import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { NovaPoshtaService } from './nova-poshta.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import { NovaPoshtaControllerLinks } from '../../types/enums/controllers-links'
import { BranchResponseDto } from './response'
import { JwtAuthGuard } from '../../guards'

@ApiTags(ApiTagsEnum.NOVA_POSHTA)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller(NovaPoshtaControllerLinks.CONTROLLER)
export class NovaPoshtaController {
  constructor(private readonly novaPoshtaService: NovaPoshtaService) {}

  @Get()
  getBranches(@Query('city') city: string): Promise<BranchResponseDto[]> {
    return this.novaPoshtaService.getBranches(city)
  }
}
