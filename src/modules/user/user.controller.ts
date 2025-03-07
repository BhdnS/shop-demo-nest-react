import { Controller, Patch, Delete, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import UserControllerLinks from '../../types/enums/controllers-links/user-controller-links'

@ApiTags(ApiTagsEnum.USER)
@Controller(UserControllerLinks.CONTROLLER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  updateUser() {
    return this.userService.updateUser()
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id)
  }
}
