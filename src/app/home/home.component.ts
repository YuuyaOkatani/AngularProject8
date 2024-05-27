import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  Forms: FormGroup; 
  Array: any;
  togglar = ''; 

  constructor(private formbuilder: FormBuilder){
    this.Forms = formbuilder.group({
      id: [],
      name: ['']
    })
    
  }

  ngOnInit(): void {
      
  }


}
