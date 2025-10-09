import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimaryButtonComponent } from '../../shared/components/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../shared/components/buttons/secondary-button/secondary-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, PrimaryButtonComponent, SecondaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  mobileOpen = false;

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }
}
