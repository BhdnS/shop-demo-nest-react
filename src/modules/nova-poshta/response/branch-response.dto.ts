import { IsString } from 'class-validator'

class BranchResponseDto {
  @IsString()
  Number: string

  @IsString()
  Description: string
}

export default BranchResponseDto
