import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import { AuthControllerLinks } from '../../types/enums/controllers-links'

@ApiTags(ApiTagsEnum.AUTH)
@Controller(AuthControllerLinks.CONTROLLER)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create() {
    return this.authService.create()
  }

  @Get()
  findAll() {
    return this.authService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id)
  }

  @Patch(':id')
  update() {
    return this.authService.update()
  }

  @Delete(':id')
  remove() {
    return this.authService.remove()
  }
}
