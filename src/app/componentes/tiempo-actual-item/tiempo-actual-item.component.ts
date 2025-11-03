import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tiempo } from '../../interfaces/tiempo';

@Component({
  selector: 'app-tiempo-actual-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tiempo-actual-item.component.html'
})
// Componente para mostrar la información del tiempo actual de una ciudad
export class TiempoActualItemComponent {
  @Input() tiempoInfo!: Tiempo; // propiedad de entrada para recibir la información del tiempo
}


