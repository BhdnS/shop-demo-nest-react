import { HttpException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'
import { AppError } from '../../utils/constants'
import { PublicUserResponse } from '../user/response'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async verifyRefreshToken(payload: string): Promise<string> {
    try {
      const { id } = this.jwtService.verify<{ id: string }>(payload, {
        secret: this.configService.get('secret_refresh_jwt'),
      })

      return id
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new HttpException(AppError.TOKEN_NOT_FOUND, 499)
    }
  }

  async verifyAccessToken(payload: string): Promise<PublicUserResponse> {
    const token = payload.replace('Bearer ', '')

    const user = this.jwtService.verify<User>(token, {
      secret: this.configService.get('secret_jwt'),
    })

    return { id: user.id, email: user.email, name: user.name, role: user.role }
  }

  async generateRefreshToken(payload: PublicUserResponse): Promise<string> {
    const id = { id: payload.id }

    return this.jwtService.sign(id, {
      secret: this.configService.get('secret_refresh_jwt'),
      expiresIn: this.configService.get('expires_refresh_jwt'),
    })
  }

  async generateAccessToken(payload: PublicUserResponse): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('secret_jwt'),
      expiresIn: this.configService.get('expires_jwt'),
    })
  }
}
