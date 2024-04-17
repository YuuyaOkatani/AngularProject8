import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../Products';
import { SupaService } from '../service/supa.service';
import { ProdutosService} from '../service/produtos.service';





@Component({
  selector: 'app-cadastro-produtos2',
  templateUrl: './cadastro-produtos2.component.html',
  styleUrl: './cadastro-produtos2.component.css'
})
export class CadastroProdutos2Component implements OnInit {

  



  

  Forms : FormGroup; 
  Product: Product[] = []; 
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
  datas: any =  [] ; 
  text = ''


  ngOnInit(): void { // ngOnInit server pra verificar o subscribe quando o programa for inicializado
    /// TODO: terminar aqui 
    this.loadProducts();

    console.log("saas")









  }

  loadProducts(){

    this.service.getProducts().subscribe({
      next: data => {
        this.datas = []
        this.datas.push(...data)
        this.Product = []
        this.Product.push(...data)
       
      
      }, 


    })
  }










  constructor(private formBuilder: FormBuilder, private SupaService: SupaService, private service: ProdutosService ){
    this.Forms  = formBuilder.group({
      id:[],
      name:[],
      description:[],
      price:[], 
      quantity:[]
    })
    
    let novoArray: any[] = []; 

    
    this.Forms.valueChanges.subscribe(() => { // aqui é ativado quando muda alguma coisa no array (deletado, adicionado ou melhorado) 
      Object.values(this.Forms.value).forEach(item => {
        if(item !== null && item !== undefined && item !== '' ){
          // colocar mais condições aqui 
          novoArray.push(item)
          console.log(novoArray)
        }
      })
      this.Array2 = novoArray.map(item => item.toString().trim().toLowerCase()) 
      novoArray = []
      
    })


    
    console.log(this.Array2)

    
    // precisa fazer alguma coisa aqui 

    // precisa fazer com que o programa edite, poste e delete um arranjo de dados, e envie ao banco de dados
    // ou seja, precisa atualizar todo o código daqui
    // não precisa mudar o html de aparecer o array. Mas precsa verificar se está coerente.


    
    

    


  }






  botao(){
  

    let result1: any = "" // some() é muito util e conveniente. Ele filtra as informações.
    let result2: any = ""
 
    result1 = this.Product.some(element => element.id.toString().toLowerCase().trim() == this.Array2[0].toString().toLowerCase().trim())
    result2 = this.Product.some(element => element.name.toString().toLowerCase().trim() == this.Array2[1].toString().toLowerCase().trim())
   
   

    console.log(result1)
    if(result1 == true || result2 == true ){
      console.log('sim, ela existe')
      
      this.text = this.product_exist
      this.togglar2 = false
      this.function4()
    }
    else{
      console.log('Ela não existe')

 

      this.service.addProducts(this.Forms.value).subscribe({
        next: data => {
          this.Product.push(data)
          this.loadProducts()
        }
      })
 
      
      this.togglar = !this.togglar // popup aviso de adicionar false -> true
      this.text = this.add_success
      
      this.togglar2 = true
      this.function4()
    }
    
    
    

    
    console.log(this.Product.length)
    console.log(this.Product)
    // this.SupaService.inserirDados(); // TODO: terminar aqui 

    
    
    
  

    

  }

  fechar(value: boolean){
    this.togglar = false // popup aviso de adicionar fechado
   
    this.togglar4 = false // popup consultar lista fechado
    this.togglar5 = false // popup editar fechado
    if(this.Product.length > 0){
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
    
 
    if(this.newName!==''  && this.Product.some(element2 => element2.name == this.newName.trim().toLowerCase()) == false){
      this.Product.forEach(element => {
        if(element.id === item.id){
      
            element.name = this.newName 
      
            this.text = this.edit_success
            this.function4()

            this.service.updateProducts(item).subscribe({
              next: data => element.name = data.name
            })
         

        }    
    })}
    else{
            this.text = this.product_exist
            this.function4()
      
    }
        if(this.newDescription !=='' ){
      this.Product.forEach(element => {
        if(element.id === item.id){
          element.description = this.newDescription

          this.text = this.edit_success
          this.function4()


          this.service.updateProducts(item).subscribe({
            next: data => element.description = data.description
          })


        }    
    })}
    if(this.newPrice!=='' ){
      this.Product.forEach(element => {
        if(element.id === item.id){
          element.price = this.newPrice
          this.text = ''

          this.text = this.edit_success
          this.function4()

          this.service.updateProducts(item).subscribe({
            next: data => element.price = data.price
          })
        }    
    })}
    if(this.newQuantity!=='' ){
      this.Product.forEach(element => {
        if(element.id === item.id){
          element.quantity = this.newQuantity

          this.text = this.edit_success
          this.function4()

          this.service.updateProducts(item).subscribe({
            next: data => element.quantity = data.quantity
          })
        }    
    })}

    this.function3()



    
    
    

    


  }

  apagarItem(item: any){ // aqui ativa o popup de apagar
    this.function2(item)



    
  }
  deletarItem(item: any){

    let numIndice = this.Product.indexOf(item.id)
    this.Product.splice(numIndice, 1 )
    this.function1(item);

    this.service.deleteProducts(item).subscribe({
      next: () => {
        this.loadProducts()
        
      }
    })
    
    

  }

  function1(item:any){

    this.togglar8 = false
    this.togglar4 = true
    this.togglar9 = true

    this.text = this.delete_success
  

    setTimeout(() => {
      this.togglar9 = false
      
      
    }, 3000);

    this.service.deleteProducts(item.id).subscribe({
      next: data => console.log(data)
    })

  }

  function2(item:any){
    this.togglar8 = true
    this.togglar4 = false
    this.product2 = item


  }

  function3(){
    console.log(this.Product)
    console.log(this.product)
    this.newName =''
    this.newDescription =''
    this.newPrice =''
    this.newQuantity = ''
    this.togglar9 = true

  }

  function4(){
    this.togglar9 = true
          setTimeout(() => {
          this.togglar9 = false
      
      
          }, 3000);

  }

  


}
