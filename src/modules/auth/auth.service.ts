import { BadRequestException, HttpException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { Response, Request } from 'express'
import { AppError } from '../../utils/constants'
import { TokenService } from '../token/token.service'
import { LoginUserDto, RegisterUserDto } from './dto'
import * as bcrypt from 'bcrypt'
import { PublicUserResponse } from '../user/response'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async registerUser(dto: RegisterUserDto, res: Response): Promise<void> {
    const existUser = await this.userService.findUserByEmail(dto.email)

    if (existUser) throw new BadRequestException(AppError.USER_EXIST)

    await this.userService.createUser(dto)

    const user = await this.userService.publicUser(dto.email)

    await this.generateTokensAndResponse(user, res)
  }

  async loginUser(dto: LoginUserDto, res: Response): Promise<void> {
    const existUser = await this.userService.findUserByEmail(dto.email)

    if (!existUser) throw new BadRequestException(AppError.USER_EXIST)

    const validatePassword = await bcrypt.compare(dto.password, existUser.password)

    if (!validatePassword) throw new BadRequestException(AppError.WRONG_PASSWORD)

    const user = await this.userService.publicUser(dto.email)

    await this.generateTokensAndResponse(user, res)
  }

  async logout(res: Response): Promise<void> {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      priority: 'high',
      secure: true,
    })

    res.status(200).json({ status: 'OK' })
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken as string

    if (!refreshToken) throw new HttpException(AppError.TOKEN_NOT_FOUND, 498)

    const tokenVerify = await this.tokenService.verifyRefreshToken(refreshToken)

    const user = await this.userService.findUserById(+tokenVerify)

    const token = await this.tokenService.generateAccessToken(user)

    res.setHeader('Authorization', `Bearer ${token}`)

    res.status(200).json({ status: 'OK' })
  }

  private async generateTokensAndResponse(user: PublicUserResponse, res: Response) {
    const token = await this.tokenService.generateAccessToken(user)
    const refreshToken = await this.tokenService.generateRefreshToken(user)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      priority: 'high',
      secure: true,
    })

    res.setHeader('Authorization', `Bearer ${token}`)

    res.json(user)
  }
}
