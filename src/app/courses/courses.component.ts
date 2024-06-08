import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../service/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { courses } from '../Courses';
import { period } from '../Periods';
import { Students } from '../Students';
import { StudentsService } from '../service/students.service';
import { HttpClient } from '@angular/common/http';
import { links } from '../links';
import { LinksService } from '../service/links.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: courses[] = [];
  Students: Students[] = []; 
  links: links[] = [];
  result: any; 
  state = ''


  url: string = '';
  Forms: FormGroup; 
  Array: any;
  togglar = ''; 
  newName: String = '';
  //periods: Object.values(period);


  constructor(private formbuider: FormBuilder,  private serviceCourse : CoursesService, private serviceStudent: StudentsService, private linkservice: LinksService) {
    this.Forms = formbuider.group({
      id: [],
      name: ['', [Validators.required]],
      linkId: [ , [Validators.required]],
      workload:[ , [Validators.required]],
      numberStudents: [0]
    })

   }

  ngOnInit(): void {
    this.loadCourses();
    this.loadLinks()


  }

  loadCourses(){
    this.serviceCourse.getCourses().subscribe(data => {
      this.courses = data;
    })

  }

  loadStudents(){
    this.serviceStudent.getStudents().subscribe(data => {
      this.Students = data;
    })
  }

  loadLinks(){
    this.linkservice.getLinks().subscribe(data => {
      this.links = data;
    })
  }

  getCourseName(courseId: number): courses | undefined{
    return this.courses.find(c => c.id === courseId);

  }
  comparewith2(link1: links, link2: links): boolean{
    return link1 && link2? link1.id == link2.id : link1 === link2; 
  }

  Message(message: string){
    this.state = message
    console.log(this.state)
            setTimeout(() => {
           
            this.state = ''; 
      
      
          }, 3000);


  }

  check(){
    if(this.Forms.valid){
      this.courses.forEach(course =>{
        if(course.name.trim().toLowerCase() === this.newName.trim().toLowerCase()){
          this.Message('course_exists')

        }
      })
      if(this.state == '' ){
        this.serviceCourse.addCourses(this.Forms.value).subscribe({
          next: data => {
            this.courses.push(data)
            this.loadCourses()
            this.Message('added_course')
            console.log(this.courses)
          }

        })
        

      }
    }
    else{
      this.Message('incomplete_form')
    }
  }

  queryArray(datas: any){
    this.courses.forEach(data => {
      if(data.id === datas.id){
        this.Array = data;
   
      }
    });
  }

  
  

  Activate(togglar: String, datas?: any){
    switch(togglar){

      case "togglar":
        this.togglar = 'togglar'; 
        console.log(this.courses)
      break;

      case "togglar2":
        this.check()
      break;

      case "togglar3":
        this.togglar = 'togglar3'; 
        this.queryArray(datas)

       
     
        
      break;

      case "togglar4":
        this.togglar = 'togglar4'; 
        this.queryArray(datas)
        
        
        
      break;

      

      case "togglar5":
        
      
        this.Array.name = this.newName; 
        this.courses.forEach(data => {
          if(data.name.trim().toLowerCase() === this.newName.trim().toLowerCase()){
            this.Message('course_exists')
   
          }
        })
        if(this.state == ''){
          this.serviceCourse.updateCourses(this.Array).subscribe(
            () => {
              this.loadCourses()
              this.Forms.reset()
              this.Message('update_course')
              this.togglar = 'togglar';
              this.newName = '';
            }
          );
          this.newName = '';
        }
        
      break;


      case "togglar6":
   
        this.serviceCourse.deleteCourses(datas).subscribe({
          next: () => {
            this.loadCourses()
            this.Forms.reset()
            this.togglar = 'togglar';
          }
        });
        

      break; 



      case "":
        this.togglar = ''; 
        
      break; 

  }
}

}
