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
      this.Array2 = novoArray.map(item => item.toString()) 
      novoArray = []
      
    })
    
    console.log(this.Array2)


  }



  





  botao(){
    /*
    this.Array.push(this.Forms.value)
    console.log(this.Array)
    */
  
    console.log(this.Array2)
    console.log(this.Array2.length)
    this.togglar = !this.togglar
    if(this.Array.length == 0){
      this.Array.push(this.Forms.value)
      
    }
    else{
      for(let i = 0; i < this.Array.length ; i++){
        if(this.Array[i].ID.toString() !== this.Array2[0].toString() ){
          this.Array.push(this.Forms.value)
          console.log('presunto')
  
  
        }
  
        
      }
    }
    
    
    console.log(this.Array.length)
    console.log(this.Array)
    console.log(this.Array2[0])

    

  }

  fechar(){
    this.togglar = !this.togglar
  }


}
