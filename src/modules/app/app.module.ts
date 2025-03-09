import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configuration } from '../../configuration'
import { UserModule } from '../user/user.module'
import { CategoriesModule } from '../categories/categories.module'
import { OrdersModule } from '../orders/orders.module'
import { NovaPoshtaModule } from '../nova-poshta/nova-poshta.module'
import { ProductsModule } from '../products/products.module'
import { AuthModule } from '../auth/auth.module'
import { TokenModule } from '../token/token.module'
import { JwtStrategy } from '../../strategy'

@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    NovaPoshtaModule,
    TokenModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
