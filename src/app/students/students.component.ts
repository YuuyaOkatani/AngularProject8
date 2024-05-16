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
  Array2: any = [];
  code: Number = 0; 
  newName: String ='';
  newAge: any = '';
  

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
            this.Student.push(data)
     
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
