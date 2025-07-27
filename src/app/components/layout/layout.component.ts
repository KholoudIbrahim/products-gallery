import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  darkMode = false;

  constructor(private auth: AuthService, private router: Router) {}

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    const htmlEl = document.documentElement;
    if (this.darkMode) {
      htmlEl.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      htmlEl.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    }
  }
}
