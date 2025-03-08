import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'
import { AxiosResponse } from 'axios'
import { ApiBranchResponseDto, BranchResponseDto } from './response'

@Injectable()
export class NovaPoshtaService {
  private readonly rootUrl: string
  private readonly apiKey: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.rootUrl = 'https://api.novaposhta.ua/v2.0/json/'
    this.apiKey = this.configService.get('nova_poshta_api_key') as string
  }

  async getBranches(city: string): Promise<BranchResponseDto[]> {
    const payload = {
      apiKey: this.apiKey,
      modelName: 'AddressGeneral',
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityName: city,
        Limit: 50,
        Page: 1,
        Language: 'UA',
      },
    }

    const response: AxiosResponse<ApiBranchResponseDto> = await firstValueFrom(
      this.httpService.post(this.rootUrl, payload)
    )
    return response.data.data.map((branch) => ({
      Number: branch.Number,
      Description: branch.Description,
    }))
  }
}
