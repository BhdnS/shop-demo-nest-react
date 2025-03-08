import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import PrismaService from '../prisma'
import { TokenModule } from '../token/token.module'

@Module({
  imports: [TokenModule],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
})
export class OrdersModule {}
