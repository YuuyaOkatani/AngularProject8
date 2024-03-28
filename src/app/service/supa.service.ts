import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';





@Injectable({
  providedIn: 'root'
})

export class SupaService {

  private supabase  = createClient(environment.supabaseUrl, environment.supabaseKey); 

  constructor() { }
 
  async inserirDados(novoNome: any, novaDescricao: any, novoPreco: any, novaQuantidade: any){
    const { data, error } = await this.supabase.from('produtos').insert([
      {
        nome: novoNome,
        descricao: novaDescricao,
        preco: novoPreco,
        quantidade: novaQuantidade
      }
    ]);
    if(error){
      console.log(error)
    }else{
      console.log(data)
    }
  }
}
