import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogueService } from '../../services/catalogue.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogue-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './catalogue-dialog.component.html',
  styleUrl: './catalogue-dialog.component.css'
})
export class DialogComponent implements OnInit {

  constructor( private catalogueService:CatalogueService){
  }

  createForm!:FormGroup;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  
  ngOnInit(): void {
  this.createForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    author:new FormControl('',[Validators.required]),
    category: new  FormControl(null,[Validators.required])
  })
  }

  submit(){
    this.onSubmit.emit(true);
    console.log(this.createForm.value);
    if(this.createForm.valid){
      this.catalogueService.create(this.createForm.value).subscribe(()=>{
        this.onSubmit.emit(true);
      })
    }
  }

  close(){
    this.onCancel.emit(true);
  }
}
