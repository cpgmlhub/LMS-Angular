import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MemberService } from '../../services/members.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-admin-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-admin-dialog.component.html',
  styleUrl: './create-admin-dialog.component.css'
})
export class CreateAdminDialogComponent {
  constructor( private authService:AuthService){
  }

  createForm!:FormGroup;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  
  ngOnInit(): void {
  this.createForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")]),
  })
  }

  submit(){
    if(this.createForm.valid){
      this.authService.register(this.createForm.value).subscribe();
      this.onSubmit.emit(true);
    }
  }

  close(){
    this.onCancel.emit(true);
  }

  get password(){
    return this.createForm.get('password');
  }
}
