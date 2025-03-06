import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NovaPoshtaService } from './nova-poshta.service';
import { CreateNovaPoshtaDto } from './dto/create-nova-poshta.dto';
import { UpdateNovaPoshtaDto } from './dto/update-nova-poshta.dto';

@Controller('nova-poshta')
export class NovaPoshtaController {
  constructor(private readonly novaPoshtaService: NovaPoshtaService) {}

  @Post()
  create(@Body() createNovaPoshtaDto: CreateNovaPoshtaDto) {
    return this.novaPoshtaService.create(createNovaPoshtaDto);
  }

  @Get()
  findAll() {
    return this.novaPoshtaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.novaPoshtaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNovaPoshtaDto: UpdateNovaPoshtaDto) {
    return this.novaPoshtaService.update(+id, updateNovaPoshtaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.novaPoshtaService.remove(+id);
  }
}
