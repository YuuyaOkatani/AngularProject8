import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { links } from '../links';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/links"

  getLinks(): Observable<links[]>{
    return this.http.get<links[]>(this.url);
  }

  getLink(link: links) : Observable<links>{
    return this.http.get<links>(`${this.url}/${link.id}`);
  }
}
