import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger'
import ApiTagsEnum from '../../types/enums/api-tags'
import { AuthControllerLinks } from '../../types/enums/controllers-links'
import { Response, Request } from 'express'
import { LoginUserDto, RegisterUserDto } from './dto'

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

  @Post(AuthControllerLinks.LOGOUT)
  logout(@Res() res: Response): Promise<void> {
    return this.authService.logout(res)
  }

  @Post(AuthControllerLinks.REFRESH_TOKEN)
  refreshToken(@Req() req: Request, @Res() res: Response): Promise<void> {
    return this.authService.refreshToken(req, res)
  }
}
