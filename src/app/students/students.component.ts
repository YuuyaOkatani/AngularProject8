import { Component, OnInit } from '@angular/core';
import { Students } from '../Students';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentsService } from '../service/students.service';
import { courses } from '../Courses';
import { CoursesService } from '../service/courses.service';
import { period } from '../Periods';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  Forms: FormGroup; 
  Students: Students[] = [];
  Courses: courses[] = [];
  periods =  Object.values(period)
  Array: any[] = [];
  Array2: any = [];
  code: Number = 0; 
  newName: String ='';
  newAge: any = '';
  text1 = 'Added student successfully! 🥳'
  text2 = 'Updated student successfully! 🥳'
  text3 = 'Deleted student successfully! 🥳'
  

  state = '';

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses()
      
  }

  constructor(private formbuilder: FormBuilder, private studentservice: StudentsService , private courseservice: CoursesService){
    this.Forms = formbuilder.group({
      
      
      id: [this.code], 
      name: [''],
      age:[],
      courseID:[],
      active: [false],
      period:[]
    })

    this.Forms.valueChanges.subscribe(() => {
      Object.values(this.Forms).forEach(item => {
        console.log("saas")

      })
    })
  }

  loadStudents(){
    this.studentservice.getStudents().subscribe(data => {
      this.Students = data;
      this.Array = [];
      this.Array.push(...data);

    })
  
    
  }

  loadCourses(){
    this.courseservice.getCourses().subscribe( data => {
       this.Courses = data; 
       // agora é so terminar o resto

    })
  }

  compareCourses(course1: courses, course2: courses): boolean {
    return course1 && course2 ? course1.id == course2.id : course1 === course2
  }

  getcourseName(courseID: number): courses | undefined {
    return this.Courses.find(item => item.id === courseID);

  }

  get course(): any {
    return this.Forms.get('courseID');
  }

  get name(): any {
    return this.Forms.get('name');
  }

  get age(): any {
    return this.Forms.get('age');
  }

  get period(): any {
    return this.Forms.get('period');
  }



  Activate(states: String, datas?: any){
    switch(states){
      case "togglar":
        this.state = 'togglar'; 
        console.log(this.Array)
      
      break; 

      case "togglar2":
        this.state = 'togglar2'
        this.code = this.Array.length + 1 ;

        

        this.studentservice.addStudents(this.Forms.value).subscribe({
          next: data => {
            this.Students.push(data)
     
            this.loadStudents()
          }

        })

      break; 

      case "togglar3":
        this.state = 'togglar3'; 
        console.log("Editar" , datas);
        
        this.Array2 = datas;

      break;

      case "togglar4":
        this.state = 'togglar4'
        this.Array2 = datas
        console.log("Apagar" , datas)
      break;

      case "togglar5":
       


        console.log()
        this.Array.forEach(element => {
          if(element.id == datas.id){
            element.name = this.newName
            element.age = this.newAge
            this.studentservice.updateStudents(element).subscribe({
              next: data => 
                {
                  data.name = element.name
            
                  this.Array2.name = '';
                  this.Array2.age = '';
                

                  this.loadStudents()
              }

               
              
            })
      
          }
        })

        
        


      break;
      
      case "togglar6":
      
        
        
        this.Array.forEach(element => {
          if(element.id === this.Array2.id){
            console.log(element.id);
           
            this.studentservice.deleteStudents(element).subscribe({
              next: () =>  this.loadStudents()
            })
        
        
          }
        })
  
        this.state = 'togglar';
        
      break;



      case "":
        this.state = ''; 
      break;
       

    }
  }

  



}
