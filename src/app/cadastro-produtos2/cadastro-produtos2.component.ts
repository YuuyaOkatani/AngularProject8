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
  text = ''; 
  state: String = ''; 


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
      this.Activate("togglar")
 
      
      // this.togglar = !this.togglar // popup aviso de adicionar false -> true
      this.text = this.add_success
      
      this.togglar2 = true
      this.function4()
    }
    
    
    

    
    console.log(this.Product.length)
    console.log(this.Product)
    // this.SupaService.inserirDados(); // TODO: terminar aqui 

    
    
    
  

    

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





  function3(){
    console.log(this.Product)
    console.log(this.product)
    this.newName =''
    this.newDescription =''
    this.newPrice =''
    this.newQuantity = ''
  

  }

  function4(){
    this.togglar9 = true
          setTimeout(() => {
          this.togglar9 = false
      
      
          }, 3000);

  }

  Activate(states: String , item? :  Object){
    console.log(states)
    switch(states){
      case "togglar":
        this.state = "togglar"; 
      break;

      case "togglar2":
        this.state = "togglar2"; 
      break;

      case "togglar3":
        this.state = "togglar3"; 
      break;
      
      case "togglar4":
        this.state = "togglar4"; 
        this.product2 = item; 

        
     
        let numIndice = this.Product.indexOf(this.product2.id)
        this.Product.splice(numIndice, 1 );
        this.service.deleteProducts(this.product2.id).subscribe({
          next: data => console.log(data)
        });
        this.text = this.delete_success;
        this.service.deleteProducts(this.product2).subscribe({
          next: () => {
            this.function4();
            this.loadProducts()
            
            
          }
        })

    
    



    


    
      break;

      case "togglar5":
        this.state = "togglar5"; 
        console.log(item)
        this.product = item 
      break;

      case "togglar6":
        this.state = "togglar6"; 
      break;

      case "togglar7":
        this.state = "togglar7"; 
      break;

      case "togglar8":
        this.state = "togglar8"; 
        this.product2 = item
      break;

      case "":
        this.state = ""; 
      break;




      

    }
  }

  


}
