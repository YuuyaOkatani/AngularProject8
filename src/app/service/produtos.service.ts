import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Products';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  url = "http://localhost:3000/Products"

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
   
    return this.http.get<Product[]>(this.url); 
    
  }
  addProducts(product: Product): Observable<Product>{
    return this.http.post<Product>(this.url, product)
  }

  updateProducts(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.url}/${product.id}`, product)
  }

  deleteProducts(product: Product) : Observable<void>{
    return this.http.delete<void>(`${this.url}/${product.id}`)
  }
}
