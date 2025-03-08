import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import PrismaService from '../prisma'
import { TokenModule } from '../token/token.module'

@Module({
  imports: [TokenModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
