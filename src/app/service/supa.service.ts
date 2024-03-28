import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';





@Injectable({
  providedIn: 'root'
})

export class SupaService {

  private supabase  = createClient(environment.supabaseUrl, environment.supabaseKey); 

  constructor() { }
 
  async inserirDados(){ // TODO: terminar aqui 
    const { data, error } = await this.supabase.from('produtos').insert([
      { nome: 'Produto 2', descricao: 'Descrição do Produto 2', preco: 15.99, quantidade: 15 }
    ]);

    if(error){
      console.log(error)
    }else{
      console.log(data)
    }
  }
}
