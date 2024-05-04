import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Students } from '../Students';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http : HttpClient) { }

  url = "http://localhost:3000/Students"

  getStudents(): Observable<Students[]> {
    return this.http.get<Students[]>(this.url);
  }

  addStudents(student: Students): Observable<Students> {
    return this.http.post<Students>(this.url, student);
  }

  updateStudents(student: Students): Observable<Students>{
    return this.http.put<Students>(`${this.url}/${student.id}`, student);
  }

  deleteStudents(student: Students) : Observable<void>{
    return this.http.delete<void>(`${this.url}/${student.id}`)
  }
}
