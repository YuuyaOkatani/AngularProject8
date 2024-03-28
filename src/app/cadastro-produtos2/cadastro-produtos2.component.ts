import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Array } from '../array';
import { SupaService } from '../service/supa.service';





@Component({
  selector: 'app-cadastro-produtos2',
  templateUrl: './cadastro-produtos2.component.html',
  styleUrl: './cadastro-produtos2.component.css'
})
export class CadastroProdutos2Component implements OnInit {

  



  

  Forms : FormGroup; 
  Array: Array[] = []; 
  Array2:string[] = [];
  novoNome: string = ''
  novaDescricao: string =''
  novoPreco: any = ''
  novaQuantidade: any = ''; 
  togglar = false
  togglar2 = false
  togglar3 = false
  togglar4 = false
  togglar5 = false
  togglar6 = false
  togglar7 = true
  togglar8 = false 
  togglar9 = false 
  togglar10 = false
  togglar11= false
  produto: any;
  produto2:any; 
  apagar_sucesso =' foi apagado com sucesso! '
  editar_sucesso =' foi editado com sucesso! '
  adicionar_sucesso = ' foi adicionado com sucesso! '
  produto_existe = ' já foi cadastrado anteriormente 😁! '
  response = false 
  texto = ''


  ngOnInit(): void {
    this.SupaService.inserirDados(this.novoNome, this.novaDescricao, this.novoPreco, this.novaQuantidade); /// TODO: terminar aqui 
  }










  constructor(private formBuilder: FormBuilder, private SupaService: SupaService){
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
  

    const result1 = this.Array.some(element => element.ID.toString().toLowerCase().trim() == this.Array2[0].toString().toLowerCase().trim()) // some() é muito util e conveniente. Ele filtra as informações.
    const result2 = this.Array.some(element => element.nome.toString().toLowerCase().trim() == this.Array2[1].toString().toLowerCase().trim())
   
   

    console.log(result1)
    if(result1 == true || result2 == true ){
      console.log('sim, ela existe')
      this.togglar9 = true
      this.texto = this.produto_existe
      this.togglar2 = false
      
      setTimeout(() => {
        this.togglar9 = false
        
        
      }, 3000);
    }
    else{
      console.log('Ela não existe')
      this.Array.push(this.Forms.value)
      
      this.togglar = !this.togglar // popup aviso de adicionar false -> true
      this.texto = this.adicionar_sucesso
      
      this.togglar2 = true
      this.togglar9 = true
      setTimeout(() => {
        this.togglar9 = false
        
      }, 3000);
    }
    
    
    

    
    console.log(this.Array.length)
    console.log(this.Array)

    
    
    
  

    

  }

  fechar(value: boolean){
    this.togglar = false // popup aviso de adicionar fechado
   
    this.togglar4 = false // popup consultar lista fechado
    this.togglar5 = false // popup editar fechado
    if(this.Array.length > 0){
      this.togglar3 = true // ativar botão de consulta 

    }
    else{
      this.togglar3 = false

    }
    if(value == true ){
      this.togglar4 = true
      this.togglar7 = true



    }
    if(this.togglar8 == true){
      this.togglar8 = false
      this.togglar4 = true

    }
    else{
      this.togglar8 = false
    }

    
    
  }

  consultarLista(){
    
    this.togglar4 = !this.togglar4 // popup abrir consultar lista  false --> true

    
  }

  editarItem(item:any){
    this.togglar5 = true
    this.togglar4 = false
    this.togglar7 = false


     
    console.log(item)
    this.produto = item 


    
    


  }

  salvarItem(item: any){
 
    if(this.novoNome!==''  && this.Array.some(element2 => element2.nome == this.novoNome.trim().toLowerCase()) == false){
      this.Array.forEach(element => {
        if(element.ID === item.ID){
      
            element.nome = this.novoNome 
      
            this.texto = this.editar_sucesso
            this.togglar9 = true
            setTimeout(() => {
            this.togglar9 = false
      
      
            }, 3000);
         

        }    
    })}
    else{
            this.texto = this.produto_existe
            this.togglar9 = true
            setTimeout(() => {
            this.togglar9 = false
      
      
            }, 3000);
      
    }
        if(this.novaDescricao !=='' ){
      this.Array.forEach(element => {
        if(element.ID === item.ID){
          element.descricao = this.novaDescricao

          this.texto = this.editar_sucesso
          this.togglar9 = true
          setTimeout(() => {
          this.togglar9 = false
      
         
          }, 3000);
        }    
    })}
    if(this.novoPreco!=='' ){
      this.Array.forEach(element => {
        if(element.ID === item.ID){
          element.preco = this.novoPreco
          this.texto = ''

          this.texto = this.editar_sucesso
          this.togglar9 = true
          setTimeout(() => {
          this.togglar9 = false
      
      
          }, 3000);
        }    
    })}
    if(this.novaQuantidade!=='' ){
      this.Array.forEach(element => {
        if(element.ID === item.ID){
          element.quantidade = this.novaQuantidade

          this.texto = this.editar_sucesso
          this.togglar9 = true

          setTimeout(() => {
          this.togglar9 = false
      
      
          }, 3000);
        }    
    })}



    
    console.log(this.Array)
    console.log(this.produto)
    this.novoNome =''
    this.novaDescricao =''
    this.novoPreco =''
    this.novaQuantidade = ''
    this.togglar9 = true
    

    


  }

  apagarItem(item: any){
    this.togglar8 = true
    this.togglar4 = false
    this.produto2 = item



    
  }
  deletarItem(item: any){
    console.log(this.Array)
    let numIndice = this.Array.indexOf(item.ID)
    console.log(numIndice)
    this.Array.splice(numIndice, 1 )
    console.log(this.Array)
    this.togglar8 = false
    this.togglar4 = true
    this.togglar9 = true

    this.texto = this.apagar_sucesso
  

    setTimeout(() => {
      this.togglar9 = false
      
      
    }, 3000);
    

  }

  


}
