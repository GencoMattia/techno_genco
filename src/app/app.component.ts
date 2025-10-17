import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'techno_genco';
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    // Register project SVG icons
    const iconPath = (name: string) => `assets/icons/${name}.svg`;
    ['facebook', 'linkedin', 'instagram'].forEach(name => {
      this.iconRegistry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(iconPath(name)));
    });
  }
}
