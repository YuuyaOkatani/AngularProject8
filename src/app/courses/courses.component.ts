import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../service/courses.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { courses } from '../Courses';
import { period } from '../Periods';
import { Students } from '../Students';
import { StudentsService } from '../service/students.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: courses[] = [];
  Students: Students[] = []; 
  Forms: FormGroup; 
  Array: any;
  togglar = ''; 
  newName: String = '';
  //periods: Object.values(period);


  constructor(private formbuider: FormBuilder,  private serviceCourse : CoursesService, private serviceStudent: StudentsService) {
    this.Forms = formbuider.group({
      id: [],
      name: ['']
    })

   }

  ngOnInit(): void {
    this.loadCourses();


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

  getCourseName(courseId: number): courses | undefined{
    return this.courses.find(c => c.id === courseId);

  }

  get name(): any{
    return this.Forms.get('name'); //TODO precisa modificar par procurar o nome do curso
  }

  Activate(togglar: String, datas?: any){
    switch(togglar){

      case "togglar":
        this.togglar = 'togglar'; 
        console.log(this.courses)
      break;

      case "togglar2":
        this.serviceCourse.addCourses(this.Forms.value).subscribe({
          next: data => {
            this.courses.push(data)
            this.loadCourses()
            console.log(this.courses)
          }

        })
      break;

      case "togglar3":
        this.togglar = 'togglar3'; 

        console.log("Editar", datas);
        this.courses.forEach(data => {
          if(data.id === datas.id){
            this.Array = data;
            console.log(this.Array)
          }
        });
     
        
      break;

      case "togglar4":
        this.togglar = 'togglar4'; 
        console.log("Editar", datas);
        this.courses.forEach(data => {
          if(data.id === datas.id){
            this.Array = data;
            console.log(this.Array)
          }
        });
        
      break;

      case "togglar6":
        console.log(this.Array)
        this.serviceCourse.deleteCourses(datas).subscribe({
          next: () => {
            this.loadCourses()
            this.togglar = 'togglar';
          }
        });
        

      break; 

      case "togglar5":
        
        console.log(datas)
        datas.name = this.newName; 
        this.serviceCourse.updateCourses(datas).subscribe(
          () => {
            this.loadCourses()
            this.togglar = 'togglar';
            this.newName = '';
          }
        );
        this.newName = '';
        
      break;



      case "":
        this.togglar = ''; 
        
      break; 

  }
}

}
