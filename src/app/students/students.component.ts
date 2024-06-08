import { Component, OnInit } from '@angular/core';
import { Students } from '../Students';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  courses: courses[] = [];
  periods =  Object.values(period)
  Array: any;

  code: Number = 0; 
  newName: String ='';
  newAge: any = '';
  newCourseId: any = '';
  newActive: any = '';
  newPeriod: any = '';
  
  state = ''
  
  

  state2 = '';

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses()
      
  }

  constructor(
    private formbuilder: FormBuilder, 
    private studentservice: StudentsService , 
    private courseservice: CoursesService){
    this.Forms = formbuilder.group({
      
      
      id: [], 
      name: ['', [Validators.required]],
      age:[ , [Validators.required]],
      courseId:[ , [Validators.required]],
      active: [false , [Validators.required]],
      period:[ , [Validators.required]]
    })

   
  }

  loadStudents(){
    this.studentservice.getStudents().subscribe(data => {
      this.Students = data;
 

    })
  
    
  }

  loadCourses(){
    this.courseservice.getCourses().subscribe( data => {
       this.courses = data; 
       // agora é so terminar o resto
       

    })
  }

  compareCourses(course1: courses, course2: courses): boolean {
    return course1 && course2 ? course1.id == course2.id : course1 === course2
  }

  getcourseName(courseId: number): courses | undefined {
    return this.courses.find(item => item.id === courseId);

  }


  Message(message: string){
    this.state2 = message
    console.log(this.state2)
            setTimeout(() => {
           
            this.state2 = ''; 
      
      
          }, 3000);


  }

  check(){
    if(this.Forms.valid){
      this.Students.forEach(student =>{
        if(student.name.trim().toLowerCase() === this.newName.trim().toLowerCase()){
          this.Message('student_exists')

        }
      })
      if(this.state2 == '' ){
        this.studentservice.addStudents(this.Forms.value).subscribe({
          next: data => {
            this.Students.push(data)
            this.loadStudents()
            this.Message('added_student')
            this.courseservice.getGroupCoursesStudents(Number(data.courseId)).subscribe({
              next: data2 => {
                console.log(data2)
                
                this.courseservice.getCourse(Number(data.courseId)).subscribe(data3 => {
                  console.log(data3)
                  data3.numberStudents = data2.length;

                  this.courseservice.updateCourses(data3).subscribe(data4 => {   
                   console.log(data4.numberStudents);
                   this.Forms.reset()
                  });

                  
                  
                })
                
        
              }
              
            })
            
          }

        })
        

      }
    }
    else{
      this.Message('incomplete_form')
    }
  }

  QueryArray(datas: any){
    this.Students.forEach(data => {
      if(data.id === datas.id){
        this.Array = data;
   
      }
    });
  }
  
 

  Activate(states: String, datas?: any){
    switch(states){
      case "togglar":
        this.state = 'togglar'; 
       
      
      break; 

      case "togglar2":
        this.state = 'togglar2'
        this.check()
     
       
        

        

    
        
      

      break; 

      case "togglar3":
        this.state = 'togglar3'; 
        this.QueryArray(datas)
   
        
 

      break;

      case "togglar4":
        this.state = 'togglar4'
        this.QueryArray(datas)

      break;

      case "togglar5":
       


        console.log()
        this.Array.name = (this.newName != ''  ? this.newName : this.Array.name)
        this.Array.age = (this.newAge != '' ? this.newAge : this.Array.age);
        this.Array.courseId = (this.newCourseId!= ''? this.newCourseId : this.Array.courseId);
        this.Array.active = (this.newActive != this.Array.active ? this.newActive : this.Array.active);
        this.Array.period = (this.newPeriod!= ''? this.newPeriod : this.Array.period);

        console.log(this.Array)
        this.studentservice.updateStudents(this.Array).subscribe({
          next: data => 
            {
            
     
              this.Message('update_student')
            

              this.loadStudents()
          }

           
          
        })

        
        


      break;
      
      case "togglar6":
      
        
      
      this.studentservice.deleteStudents(this.Array).subscribe({
        next: () => { 
          this.loadStudents()
          this.Message('delete_student')
        
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
