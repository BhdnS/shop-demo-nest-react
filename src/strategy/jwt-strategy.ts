import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { IJwtPayload } from '../types/jwt/jwt'

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('secret_jwt') as string,
    })
  }

  async validate(payload: IJwtPayload) {
    return payload.user
  }
}

export default JwtStrategy
