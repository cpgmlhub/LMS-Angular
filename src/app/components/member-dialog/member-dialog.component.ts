import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogueService } from '../../services/catalogue.service';
import { CommonModule } from '@angular/common';
import { MemberService } from '../../services/members.service';

@Component({
  selector: 'app-member-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './member-dialog.component.html',
  styleUrl: './member-dialog.component.css'
})
export class MemberDialogComponent implements OnInit {

  constructor( private memberService:MemberService){
  }

  createForm!:FormGroup;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  
  ngOnInit(): void {
  this.createForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    department: new FormControl('',[Validators.required])
  })
  }

  submit(){
    this.onSubmit.emit(true);
    console.log(this.createForm.value);
    if(this.createForm.valid){
      this.memberService.create(this.createForm.value).subscribe(()=>{
        this.onSubmit.emit(true);
      })
    }
  }

  close(){
    this.onCancel.emit(true);
  }
}
