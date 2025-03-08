import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

class ProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  images: string[]

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  category: number
}

export default ProductDto
