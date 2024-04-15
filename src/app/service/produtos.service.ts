import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Array } from '../array';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  url = "http://localhost:3000/produtos"

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Array[]>{
   
    return this.http.get<Array[]>(this.url); 
    
  }
  addProdutos(): Observable<Array>{
    return this.http.post<Array>(this.url, Array)
  }

  updateProdutos(Array: Array): Observable<Array>{
    return this.http.put<Array>(`${this.url}/${Array.ID}`, Array)
  }

  deleteProdutos(Array: Array) : Observable<void>{
    return this.http.delete<void>(`${this.url}/${Array.ID}`)
  }
}
