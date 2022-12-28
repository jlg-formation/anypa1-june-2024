import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias(
      'outlined',
      'material-icons-outlined mat-ligature-font'
    );
  }
}
