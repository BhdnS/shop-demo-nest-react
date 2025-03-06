import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configuration } from '../../configuration'
import { UserModule } from '../user/user.module'
import { CategoriesModule } from '../categories/categories.module'
import { OrdersModule } from '../orders/orders.module'
import { NovaPoshtaModule } from '../nova-poshta/nova-poshta.module'
import { ProductsModule } from '../products/products.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    UserModule,
    CategoriesModule,
    OrdersModule,
    NovaPoshtaModule,
    ProductsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  // providers: [
  //   // {
  //   //   provide: APP_GUARD,
  //   //   useClass: RolesGuard,
  //   // },
  //   PrismaService,
  // ],
  // exports: [PrismaService],
})
export class AppModule {}
