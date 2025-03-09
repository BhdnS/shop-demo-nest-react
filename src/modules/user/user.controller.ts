import { Controller, Patch, Delete, Body, Req, Get, UseGuards, Param, ParseIntPipe } from '@nestjs/common'
import { UserService } from './user.service'
import { Request } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import UserControllerLinks from '../../types/enums/controllers-links/user-controller-links'
import UpdateUserDto from './dto/update-user.dto'
import PublicUserResponse from './response/public-user.response'
import { User } from '@prisma/client'
import { JwtAuthGuard } from '../../guards'

@ApiTags(ApiTagsEnum.USER)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
  updateUser(@Body() dto: UpdateUserDto): Promise<PublicUserResponse> {
    return this.userService.updateUser(dto)
  }

  @Delete(`${UserControllerLinks.DELETE}/:id`)
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.deleteUser(id)
  }
}
