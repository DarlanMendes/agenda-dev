// Pessoa.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { Empresa } from './empresa.entity';


@Controller('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}
  @Get()
  async findAll(): Promise<Empresa[]> {
    return this.empresaService.getEmpresas();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Empresa> {
    return this.empresaService.getEmpresaById(id);
  }

  @Post()
  async create(@Body() empresa: Empresa): Promise<Empresa> {
    return this.empresaService.createEmpresa(empresa);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() empresa: Empresa): Promise<Empresa> {
    return this.empresaService.updateEmpresa(id, empresa);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.empresaService.deleteEmpresa(id);
  }
}
