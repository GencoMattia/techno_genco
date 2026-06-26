import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SecondaryButtonComponent } from '../../shared/components/buttons/secondary-button/secondary-button.component';
import { DataService } from '../../core/services/data.service';

interface HeaderNav { label: string; path: string; exact: boolean; }

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SecondaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  mobileOpen = false;
  nav: HeaderNav[];

  constructor(private router: Router, data: DataService) {
    this.nav = data.getNav().map(n => ({ label: n.label, path: n.path, exact: n.path === '/' }));
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  goContact() {
    this.mobileOpen = false;
    this.router.navigate(['/contact']);
  }
}
