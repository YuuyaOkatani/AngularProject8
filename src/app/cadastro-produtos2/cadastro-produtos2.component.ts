import { Component, untracked } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Array } from '../array';


@Component({
  selector: 'app-cadastro-produtos2',
  templateUrl: './cadastro-produtos2.component.html',
  styleUrl: './cadastro-produtos2.component.css'
})
export class CadastroProdutos2Component {

  Forms : FormGroup; 
  Array: Array[] = []; 
  Array2:string[] = [];
  togglar = false
  togglar2 = false
  togglar3 = false
  togglar4 = false
  togglar5 = false
  togglar6 = false
  response = ''

  /*

  Elemento:string[] = []
  ID: string = ''
  nome:string = ''
  descricao:string = '' 
  preco: string = ''  
  quantidade: string = ''


  
  */





  constructor(private formBuilder: FormBuilder){
    this.Forms  = formBuilder.group({
      ID:[],
      nome:[],
      descricao:[],
      preco:[], 
      quantidade:[]
    })
    let novoArray: any[] = []

    
    this.Forms.valueChanges.subscribe(() => {
      Object.values(this.Forms.value).forEach(item => {
        if(item !== null && item !== undefined && item !== '' ){
          // colocar mais condições aqui 
          novoArray.push(item)
        }
      })
      this.Array2 = novoArray.map(item => item.toString().toLowerCase().trim()) 
      novoArray = []
      
    })
    
    console.log(this.Array2)


  }



  





  botao(){
    /*
    this.Array.push(this.Forms.value)
    console.log(this.Array)
    

    this.togglar = !this.togglar
   
    if(this.Array.length === 0 ){
      this.Array.push(this.Forms.value)
    }
    else{
      for(let i = 0; i < this.Array.length ; i++ ){
        this.Array.push(this.Forms.value)
      }
      

    }
    */
    const result1 = this.Array.some(element => element.ID.toString().toLowerCase().trim() == this.Array2[0].toString().toLowerCase().trim()) // some() é muito util e conveniente. Ele filtra as informações.
    const result2 = this.Array.some(element => element.nome.toString().toLowerCase().trim() == this.Array2[1].toString().toLowerCase().trim())
   
   

    console.log(result1)
    if(result1 == true || result2 == true ){
      console.log('sim, ela existe')
      this.togglar2 = false
    }
    else{
      console.log('Ela não existe')
      this.Array.push(this.Forms.value)
      this.togglar2 = true
    }
    this.togglar = !this.togglar // popup aviso de adicionar false -> true
    

    
    console.log(this.Array.length)
    console.log(this.Array)

    
    
    
  

    

  }

  fechar(){
    this.togglar = false // popup aviso de adicionar fechado
    this.togglar3 = true // ativar botão de consulta 
    this.togglar4 = false // popup consultar lista fechado
    this.togglar5 = false // popup editar fechado
    
  }

  consultarLista(){
    
    this.togglar4 = !this.togglar4 // popup abrir consultar lista  false --> true

    
  }

  editarItem(){
    this.togglar5 = !this.togglar5 // popup editar false --> true
    this.togglar4 = !this.togglar4 // popup consultar lista false --> true 


  }

  salvarItem(){
    this.togglar5 = true


  }

  apagarItem(){
    this.togglar6 = true
    
  }

  


}
