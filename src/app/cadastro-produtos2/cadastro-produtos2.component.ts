import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Products } from '../Products';
import { SupaService } from '../service/supa.service';
import { ProdutosService} from '../service/produtos.service';





@Component({
  selector: 'app-cadastro-produtos2',
  templateUrl: './cadastro-produtos2.component.html',
  styleUrl: './cadastro-produtos2.component.css'
})
export class CadastroProdutos2Component implements OnInit {

  



  

  Forms : FormGroup; // forms é usado para cirar um documento com variáveis colocados na página html 
  Products: Products[] = []; 
  Array2:string[] = [];
  newName: string = ''
  newDescription: string =''
  newPrice: any = ''
  newQuantity: any = ''; 
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
  product: any;
  product2:any; 
  delete_success =' foi apagado com sucesso! '
  edit_success =' foi editado com sucesso! '
  add_success = ' foi adicionado com sucesso! '
  product_exist = ' já foi cadastrado anteriormente 😁! '
  response = false 
  dados: any =  [] ; 
  texto = ''


  ngOnInit(): void { // ngOnInit server pra verificar o subscribe quando o programa for inicializado
    /// TODO: terminar aqui 
    this.loadProducts()
    

    console.log("saas")


  }

  loadProducts(){

    this.service.getProducts().subscribe({
      next: data => this.dados.push(...data), 


    })
  }












  constructor(private formBuilder: FormBuilder, private SupaService: SupaService, private service: ProdutosService ){
    this.Forms  = formBuilder.group({
      ID:[],
      nome:[],
      descricao:[],
      preco:[], 
      quantidade:[]
    })
    
    let novoArray: any[] = []; 

    
    this.Forms.valueChanges.subscribe(() => { // aqui é ativado quando muda alguma coisa no array de Array (deletado, adicionado ou melhorado) 
      Object.values(this.Forms.value).forEach(item => {
        if(item !== null && item !== undefined && item !== '' ){
          // colocar mais condições aqui 
          novoArray.push(item)
        }
      })
      
      this.Array2 = novoArray.map(item => item.toString().toLowerCase().trim()) 

      novoArray = []
      
    })


    

    console.log(this.dados)

    console.log(this.Array2) // precisa fazer alguma coisa aqui 

   

    // precisa fazer com que o programa edite, poste e delete um arranjo de dados, e envie ao banco de dados
    // ou seja, precisa atualizar todo o código daqui
    // não precisa mudar o html de aparecer o array. Mas precsa verificar se está coerente.


    
    

    


  }






  botao(){
  

    let result1: any = "" ///= this.dados.some(element => element.ID.toString().toLowerCase().trim() == this.Array2[0].toString().toLowerCase().trim()) // some() é muito util e conveniente. Ele filtra as informações.
    let result2: any = ""  ///= this.dados.some(element => element.nome.toString().toLowerCase().trim() == this.Array2[1].toString().toLowerCase().trim()) /// Erro aqui que eu não entendo 
    
    this.service.getProducts().subscribe({
      next: data => {
        result1 = data.some(element => element.id.toString().toLowerCase().trim() ==this.Array2[0].toString().toLowerCase().trim())
        result2 = data.some(element => element.name.toString().toLowerCase().trim() == this.Array2[1].toString().toLowerCase().trim())

      }
    })

    console.log(result1)
    console.log(result2)


   


    if(result1 == true || result2 == true ){ // se um elemento com esse ID ou o nome existe, então retorna true
      console.log('sim, ela existe')
      this.togglar9 = true
      this.texto = this.product_exist
      this.togglar2 = false
      
      setTimeout(() => {
        this.togglar9 = false
        
        
      }, 3000);
    }
    else{
      console.log('Ela não existe') // se nenhum dos dois existe, então ela criará um novo produto 
      //this.Array.push(this.Forms.value) 

      //Feito uma modificação para adicionar um novo documento dentro de um documento json
      this.service.addProducts(this.Forms.value).subscribe({
        next: data => {
          this.Products.push(data);
          this.Forms.reset();
        }
      }); 

      
      this.togglar = !this.togglar // popup aviso de adicionar false -> true
      this.texto = this.add_success
      
      this.togglar2 = true
      this.togglar9 = true
      setTimeout(() => {
        this.togglar9 = false
        
      }, 3000);
    }
    
    
    

    
    console.log(this.Products.length)

    this.SupaService.inserirDados(); // TODO: terminar aqui 

    
    
    
  

    

  }

  fechar(value: boolean){
    this.togglar = false // popup aviso de adicionar fechado
   
    this.togglar4 = false // popup consultar lista fechado
    this.togglar5 = false // popup editar fechado
    if(this.Products.length > 0){
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
    this.product = item 


    
    


  }

  salvarItem(item: any){
 
    if(this.newName!==''  && this.Products.some(element2 => element2.name == this.newName.trim().toLowerCase()) == false){
      this.Products.forEach(element => {
        if(element.id === item.id){
      
            element.name = this.newName
      
            this.texto = this.edit_success
            this.togglar9 = true
            setTimeout(() => {
            this.togglar9 = false
      
      
            }, 3000);
         

        }    
    })}
    else{
            this.texto = this.product_exist
            this.togglar9 = true
            setTimeout(() => {
            this.togglar9 = false
      
      
            }, 3000);
      
    }
        if(this.newDescription !=='' ){
      this.Products.forEach(element => {
        if(element.id === item.id){
          element.description = this.newDescription

          this.texto = this.edit_success
          this.togglar9 = true
          setTimeout(() => {
          this.togglar9 = false
      
         
          }, 3000);
        }    
    })}
    if(this.newPrice!=='' ){
      this.Products.forEach(element => {
        if(element.id === item.id){
          element.price = this.newPrice
          this.texto = ''

          this.texto = this.edit_success
          this.togglar9 = true
          setTimeout(() => {
          this.togglar9 = false
      
      
          }, 3000);
        }    
    })}
    if(this.newQuantity!=='' ){
      this.Products.forEach(element => {
        if(element.id === item.id){
          element.quantity = this.newQuantity

          this.texto = this.edit_success
          this.togglar9 = true

          setTimeout(() => {
          this.togglar9 = false
      
      
          }, 3000);
        }    
    })}


    this.newName =''
    this.newDescription =''
    this.newPrice =''
    this.newQuantity = ''
    this.togglar9 = true
    

    


  }

  apagarItem(item: any){ // aqui ativa o popup de apagar
    this.togglar8 = true
    this.togglar4 = false
    this.product2 = item



    
  }
  deletarItem(item: any){
    console.log(this.product)
    let numIndice = this.product.indexOf(item.ID)
    console.log(numIndice)
    this.product.splice(numIndice, 1 )
    console.log(this.product)
    this.togglar8 = false
    this.togglar4 = true
    this.togglar9 = true

    this.texto = this.delete_success
  

    setTimeout(() => {
      this.togglar9 = false
      
      
    }, 3000);

    this.service.deleteProducts(item.id).subscribe({
      next: data => console.log(data)
    })
    

  }

  


}
