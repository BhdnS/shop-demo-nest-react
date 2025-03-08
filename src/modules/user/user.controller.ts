import { Controller, Patch, Delete, Body, Req, Get } from '@nestjs/common'
import { UserService } from './user.service'
import { Request } from 'express'
import { ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import UserControllerLinks from '../../types/enums/controllers-links/user-controller-links'
import UpdateUserDto from './dto/update-user.dto'
import PublicUserResponse from './response/public-user.response'
import { User } from '@prisma/client'

@ApiTags(ApiTagsEnum.USER)
@Controller(UserControllerLinks.CONTROLLER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Req() req: Request): Promise<PublicUserResponse> {
    return this.userService.getUser(req)
  }

  @Get(UserControllerLinks.ALL_USERS)
  getAllUsers(): Promise<PublicUserResponse[]> {
    return this.userService.getAllUsers()
  }

  @Patch(UserControllerLinks.UPDATE)
  updateUser(@Body() dto: UpdateUserDto, @Req() req: Request): Promise<PublicUserResponse> {
    return this.userService.updateUser(dto, req)
  }

  @Delete(UserControllerLinks.DELETE)
  deleteUser(@Req() req: Request): Promise<User> {
    return this.userService.deleteUser(req)
  }
}
