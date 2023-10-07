
import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { Empresa } from './empresa.entity';

@Injectable()
export class EmpresaService {
  private supabase = createClient(
    'https://behttkemxowrvhnghnvb.supabase.co', // Substitua pelo URL do seu Supabase
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlaHR0a2VteG93cnZobmdobnZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3MDIyMzIsImV4cCI6MjAxMjI3ODIzMn0.fpYY6qmYkgNdkb6U4xlFNAyrGIPOFuzt9Ln9OFJ5zNY' // Substitua pela sua chave de API do Supabase
  );
  async getEmpresas():Promise<Empresa[]>{
    const{data:empresa, error}=await  this.supabase
    .from('empresa')
    .select('*');
    if(error){
      throw error
    }
    return empresa
  }
  async getEmpresaById(id: string): Promise<Empresa> {
    const { data: empresa, error } = await this.supabase
      .from('empresa') // Substitua pelo nome da tabela no Supabase
      .select('*')
      .eq('id', id); // Substitua 'id' pelo campo de identificação

    if (error) {
      throw error;
    }

    return empresa[0]; // Assumindo que o resultado é um único objeto
  }
  async createEmpresa(data: Empresa): Promise<Empresa> {
    const { data: empresa, error } = await this.supabase
      .from('empresa') // Substitua pelo nome da tabela no Supabase
      .upsert([data]); // Substitua 'data' pelo objeto que deseja inserir

    if (error) {
      throw error;
    }

    return empresa;
  }
  async updateEmpresa(id: string, data: Empresa): Promise<Empresa> {
    const { data: empresa, error } = await this.supabase
      .from('empresa') // Substitua pelo nome da tabela no Supabase
      .update(data) // Substitua 'data' pelos campos que deseja atualizar
      .eq('id', id); // Substitua 'id' pelo campo de identificação

    if (error) {
      throw error;
    }

    return empresa; // Assumindo que o resultado é um único objeto
  }
  async deleteEmpresa(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('empresa') // Substitua pelo nome da tabela no Supabase
      .delete()
      .eq('id', id); // Substitua 'id' pelo campo de identificação

    if (error) {
      throw error;
    }
  }
}