import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator'
import BranchResponseDto from './branch-response.dto'

class ApiBranchResponseDto {
  @IsBoolean()
  success: boolean

  @IsArray()
  @IsString({ each: true })
  data: BranchResponseDto[]

  @IsArray()
  @IsString({ each: true })
  errors: string[]

  @IsArray()
  @IsString({ each: true })
  warnings: string[]

  @IsOptional()
  info?: any

  @IsArray()
  @IsString({ each: true })
  messageCodes: string[]

  @IsArray()
  @IsString({ each: true })
  errorCodes: string[]

  @IsArray()
  @IsString({ each: true })
  warningCodes: string[]

  @IsArray()
  @IsString({ each: true })
  infoCodes: string[]
}

export default ApiBranchResponseDto
