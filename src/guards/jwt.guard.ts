import { AuthGuard } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
class JwtAuthGuard extends AuthGuard('jwt') {}

export default JwtAuthGuard
