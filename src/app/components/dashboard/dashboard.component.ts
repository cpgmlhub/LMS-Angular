import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CreateAdminDialogComponent } from '../create-admin-dialog/create-admin-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule,CreateAdminDialogComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user;
  showDialog =false;
  constructor(private authService:AuthService,private router:Router){
    this.user = this.authService.getUser();
  }
  
  showCreateDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
    alert("Admin user not registered");
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  submit(value: any) {
      this.showDialog = false;
      alert("Admin user registered successfully");
  }
}
