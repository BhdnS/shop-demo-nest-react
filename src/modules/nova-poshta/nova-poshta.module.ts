import { Module } from '@nestjs/common'
import { NovaPoshtaService } from './nova-poshta.service'
import { NovaPoshtaController } from './nova-poshta.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [NovaPoshtaController],
  providers: [NovaPoshtaService],
})
export class NovaPoshtaModule {}
