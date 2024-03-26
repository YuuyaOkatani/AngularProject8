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
    this.togglar = !this.togglar
    

    
    console.log(this.Array.length)
    console.log(this.Array)

    
    
    
  

    

  }

  fechar(){
    this.togglar = !this.togglar
    this.togglar3 = true
    
  }


}
