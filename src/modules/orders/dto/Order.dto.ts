import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

class Product {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  product: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number
}

class OrderDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  novaPoshtaBranch: string

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  products: Product[]
}

export default OrderDto
