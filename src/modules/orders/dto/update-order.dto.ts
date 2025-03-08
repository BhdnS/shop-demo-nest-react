import OrderDto from './Order.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

class UpdateOrderDto extends OrderDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number
}

export default UpdateOrderDto
