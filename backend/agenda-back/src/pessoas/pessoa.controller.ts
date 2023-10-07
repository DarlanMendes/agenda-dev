// Pessoa.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './pessoa.entity';


@Controller('pessoas')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}
  @Get()
  async findAll(): Promise<Pessoa[]> {
    return this.pessoaService.getPessoas();
  }
 
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Pessoa> {
    return this.pessoaService.getPessoaById(id);
  }

  @Post()
  async create(@Body() pessoa: Pessoa): Promise<Pessoa> {
    return this.pessoaService.createPessoa(pessoa);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() pessoa: Pessoa): Promise<Pessoa> {
    return this.pessoaService.updatePessoa(id, pessoa);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.pessoaService.deletePessoa(id);
  }
}
