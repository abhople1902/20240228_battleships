import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) { }
  takeToLogin() {
    this.router.navigate(['/signin']);
  }

  takeToSignup() {
    this.router.navigate(['/register']);
  }

  takeToHomepage() {
    this.router.navigate(['/']);
  }
}
