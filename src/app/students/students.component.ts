import { Component, OnInit } from '@angular/core';
import { Students } from '../Students';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentsService } from '../service/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  Forms: FormGroup; 
  Student: Students[] = [];
  Array: any[] = [];
  code: Number = 0; 

  state = '';

  ngOnInit(): void {
    this.loadStudents();
      
  }

  constructor(private formbuilder: FormBuilder, private studentservice: StudentsService ){
    this.Forms = formbuilder.group({
      
      
      id: [this.code], 
      name: [''],
      age:[]
    })

    this.Forms.valueChanges.subscribe(() => {
      Object.values(this.Forms).forEach(item => {
        console.log("saas")

      })
    })
  }

  loadStudents(){
    this.studentservice.getStudents().subscribe(data => {
      this.Student = data;
      this.Array = [];
      this.Array.push(...data);

    })
    console.log(this.Array)
    
  }



  Activate(states: String, data?: object){
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
            this.Student.push(data)
     
            this.loadStudents()
          }

        })

      break; 


      case "":
        this.state = ''; 
      break;
       

    }
  }

  



}
