import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      console.log('Form Submitted');
      this.authService.login(this.loginForm.value).subscribe(
        (res) => {
          console.log(res);
          alert('Login Successful');
          this.authService.setUser(this.loginForm.value);
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          console.log(err);
          alert('Login Failed');
        }
      );
    } else {
      console.log('Form Not Submitted');
      alert('please enter valid details');
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get Password() {
    return this.loginForm.get('password');
  }
}
