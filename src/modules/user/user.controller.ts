import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'

@ApiTags(ApiTagsEnum.USER)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create() {
    return this.userService.create()
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne() {
    return this.userService.findOne()
  }

  @Patch(':id')
  update() {
    return this.userService.update()
  }

  @Delete(':id')
  remove() {
    return this.userService.remove()
  }
}
