import { CommonModule } from '@angular/common';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnChanges {
  showUserMenu = false;
  user:any;
  constructor(private authService:AuthService,){
    this.user = this.authService.getUser();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log("I came here ",changes)
    this.user = this.authService.getUser();
  }
  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

}
