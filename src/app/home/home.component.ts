import { Component, OnInit, createNgModule } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Students } from '../Students';
import { courses } from '../Courses';
import { StudentsService } from '../service/students.service';
import { CoursesService } from '../service/courses.service';
import { LinksService } from '../service/links.service';
import { links } from '../links';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  Forms: FormGroup; 
  students: Students[] = []
  courses: courses[] = []
  links: links[] = []
  link = '/assets/';
  array: any[] = []; 
  number = 0;
 
  togglar = ''; 
  


  constructor(
    private formbuilder: FormBuilder,
    private studentservice: StudentsService,
    private coursesservice: CoursesService, 
    private linksservice: LinksService



  ){
    this.Forms = formbuilder.group({
      id: [],
      name: [''],
      imageId: [''], 
    })
    
  }

  ngOnInit(): void {
      this.loadStudents()
      this.loadCourses()
      this.loadLinks()
      
 
      
      
     
  


  }

  loadStudents(){
    this.studentservice.getStudents().subscribe({
      next: data => {
        this.students = data;
        
        
        
      }
      
    })


           
  }

  loadCourses(){
    this.coursesservice.getCourses().subscribe({
      next: data => {
        this.courses = data;
        
        
        this.courses.forEach(course =>{
          console.log(course)
          
        })
      }
    })
  }

  loadLinks(){
    this.linksservice.getLinks().subscribe({
      next: data => {
        this.links = data;
        
        
       
      }
    })
  }


  

 

  




}
