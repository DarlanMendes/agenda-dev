
import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { Pessoa } from './pessoa.entity';

@Injectable()
export class PessoaService {
  private supabase = createClient(
    process.env.SUPABASE_URL,// // Substitua pelo URL do seu Supabase
    process.env.SUPABASE_API//// Substitua pela sua chave de API do Supabase
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