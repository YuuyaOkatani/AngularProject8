import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosService } from '../service/produtos.service';
import { Product } from '../Products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  
  forms: FormGroup; 
  product: Product = {} as Product; 
  products: Product[] = [];
  response: any; 
  text: any; 
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProdutosService
  
  
  ){

    this.forms = this.formBuilder.group({
      id: [''],
      name: ['' ,[Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(100)]],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });

  }

  save(){
    this.activate('congrat')
    if(this.forms.valid){
      this.productService.addProducts(this.forms.value).subscribe({
        next: () => {
          this.loadProducts();
          this.forms.reset();
          this.popup();
        },
        error: error => console.error(error)
      })
    }

  }

  ngOnInit(): void {
    this.loadProducts();
  }


  loadProducts(){
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
      },
      error => console.error(error)
    );
  }

  activate(response: string) {
    this.response = response;
    console.log(this.response);
  }

  popup() {
    this.text = true
    setTimeout(() => {
      this.text = false


    }, 3000);

  }

  //TODO arrumar o layout do query 
  //TODO Arrumar update e delete
  //TODO arrumar o search por nome

}
