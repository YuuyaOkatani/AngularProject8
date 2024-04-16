import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../Products';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  url = "http://localhost:3000/Products"

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Products[]>{
   
    return this.http.get<Products[]>(this.url); 
    
  }
  addProducts(array: Products): Observable<Products>{
    return this.http.post<Products>(this.url, array)
  }

  updateProducts(array: Products): Observable<Products>{
    return this.http.put<Products>(`${this.url}/${array.id}`, array)
  }

  deleteProducts(array: Products) : Observable<void>{
    return this.http.delete<void>(`${this.url}/${array.id}`)
  }
}
