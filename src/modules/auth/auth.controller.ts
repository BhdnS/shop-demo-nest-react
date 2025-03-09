import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import { AuthControllerLinks } from '../../types/enums/controllers-links'
import { Response, Request } from 'express'
import { LoginUserDto, RegisterUserDto } from './dto'
import { JwtAuthGuard } from '../../guards'

@ApiTags(ApiTagsEnum.AUTH)
@Controller(AuthControllerLinks.CONTROLLER)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthControllerLinks.REGISTER)
  register(@Body() dto: RegisterUserDto, @Res() res: Response): Promise<void> {
    return this.authService.registerUser(dto, res)
  }

  @Post(AuthControllerLinks.LOGIN)
  login(@Body() dto: LoginUserDto, @Res() res: Response): Promise<void> {
    return this.authService.loginUser(dto, res)
  }

  @ApiBearerAuth()
  @Post(AuthControllerLinks.LOGOUT)
  logout(@Res() res: Response): Promise<void> {
    return this.authService.logout(res)
  }

  @ApiBearerAuth()
  @Post(AuthControllerLinks.REFRESH_TOKEN)
  refreshToken(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.authService.refreshToken(req, res)
  }
}
