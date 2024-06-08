import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { courses } from '../Courses';
import { Students } from '../Students';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000/courses';


  getGroupCoursesStudents(id: number): Observable<courses[]>{

    return this.http.get<courses[]>(`${this.url}/${id}/students`);
  }

  
  getCourses(): Observable<courses[]> {
    return this.http.get<courses[]>(this.url); 
  }

  getCourse(id:number ): Observable<courses>{
    return this.http.get<courses>(`${this.url}/${id}`);
  }

  addCourses(course: courses): Observable<courses> {
    return this.http.post<courses>(this.url, course);
  }
  updateCourses(course: courses): Observable<courses> {
    return this.http.put<courses>(`${this.url}/${course.id}`, course);
  }
  deleteCourses(course: courses): Observable<void> {
    return this.http.delete<void>(`${this.url}/${course.id}`);
  }
  
}
