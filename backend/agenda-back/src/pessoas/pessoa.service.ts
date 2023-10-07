// // user.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Pessoa } from './pessoa.entity';
// import { UUID } from 'crypto';


// @Injectable()
// export class PessoaService {
//   constructor(
//     @InjectRepository(Pessoa)
//     private readonly pessoaRepository: Repository<Pessoa>,
//   ) {}

//   async findAll(): Promise<Pessoa[]> {
//     return this.pessoaRepository.find();
//   }

//   async findOneById(id: string): Promise<Pessoa | undefined> {
//     return this.pessoaRepository.findOneBy({id});
//   }

//   async create(user: Pessoa): Promise<Pessoa> {
//     return this.pessoaRepository.save(user);
//   }

//   async update(id: string, user: Pessoa): Promise<Pessoa> {
//     await this.pessoaRepository.update(id, user);
//     return this.pessoaRepository.findOne(id as any);
//   }

//   async remove(id: string): Promise<void> {
//     await this.pessoaRepository.delete(id);
//   }
// }
import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { Pessoa } from './pessoa.entity';

@Injectable()
export class PessoaService {
  private supabase = createClient(
    'https://behttkemxowrvhnghnvb.supabase.co', // Substitua pelo URL do seu Supabase
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlaHR0a2VteG93cnZobmdobnZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3MDIyMzIsImV4cCI6MjAxMjI3ODIzMn0.fpYY6qmYkgNdkb6U4xlFNAyrGIPOFuzt9Ln9OFJ5zNY' // Substitua pela sua chave de API do Supabase
  );
  async getPessoas():Promise<Pessoa[]>{
    const{data:pessoa, error}=await  this.supabase
    .from('pessoa')
    .select('*');
    if(error){
      throw error
    }
    return pessoa
  }
  async getPessoaById(id: string): Promise<Pessoa> {
    const { data: pessoa, error } = await this.supabase
      .from('pessoa') // Substitua pelo nome da tabela no Supabase
      .select('*')
      .eq('id', id); // Substitua 'id' pelo campo de identificação

    if (error) {
      throw error;
    }

    return pessoa[0]; // Assumindo que o resultado é um único objeto
  }
  async createPessoa(data: Pessoa): Promise<Pessoa> {
    const { data: pessoa, error } = await this.supabase
      .from('pessoa') // Substitua pelo nome da tabela no Supabase
      .upsert([data]); // Substitua 'data' pelo objeto que deseja inserir

    if (error) {
      throw error;
    }

    return pessoa;
  }
  async updatePessoa(id: string, data: Pessoa): Promise<Pessoa> {
    const { data: pessoa, error } = await this.supabase
      .from('pessoa') // Substitua pelo nome da tabela no Supabase
      .update(data) // Substitua 'data' pelos campos que deseja atualizar
      .eq('id', id); // Substitua 'id' pelo campo de identificação

    if (error) {
      throw error;
    }

    return pessoa; // Assumindo que o resultado é um único objeto
  }
  async deletePessoa(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('pessoa') // Substitua pelo nome da tabela no Supabase
      .delete()
      .eq('id', id); // Substitua 'id' pelo campo de identificação

    if (error) {
      throw error;
    }
  }
}