import { Injectable } from '@nestjs/common';
import { CreateNovaPoshtaDto } from './dto/create-nova-poshta.dto';
import { UpdateNovaPoshtaDto } from './dto/update-nova-poshta.dto';

@Injectable()
export class NovaPoshtaService {
  create(createNovaPoshtaDto: CreateNovaPoshtaDto) {
    return 'This action adds a new novaPoshta';
  }

  findAll() {
    return `This action returns all novaPoshta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} novaPoshta`;
  }

  update(id: number, updateNovaPoshtaDto: UpdateNovaPoshtaDto) {
    return `This action updates a #${id} novaPoshta`;
  }

  remove(id: number) {
    return `This action removes a #${id} novaPoshta`;
  }
}
