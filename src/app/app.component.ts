import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, // importar RouterOutlet para las rutas
      RouterLinkWithHref, // importar RouterLinkWithHref para los enlaces
      RouterLinkActive, // importar RouterLinkActive para los enlaces activos
      CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-tiempo';
  isMenuOpen = false;
}
