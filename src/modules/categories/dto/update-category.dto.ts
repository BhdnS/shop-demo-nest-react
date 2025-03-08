import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

class UpdateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number
}

export default UpdateCategoryDto
