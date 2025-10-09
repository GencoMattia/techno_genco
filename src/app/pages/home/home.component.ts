import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from '../../shared/components/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../shared/components/buttons/secondary-button/secondary-button.component';
import { CardComponent } from '../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    CardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
