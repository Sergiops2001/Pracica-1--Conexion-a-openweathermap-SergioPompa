import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { TiempoServiceService } from '../../servicios/tiempo-service.service';
import { TiempoActualResponse } from '../../interfaces/tiempo';
import { TiempoActualItemComponent } from '../tiempo-actual-item/tiempo-actual-item.component';
import { FavoritosService } from '../../servicios/favoritos.service';
import { CiudadFavorita } from '../../interfaces/ciudad-favorita';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [CommonModule, FormsModule, TiempoActualItemComponent, RouterLink],
  templateUrl: './busqueda.component.html',
  styles: ``
})
export class BusquedaComponent { // Componente de búsqueda de ciudades para obtener el tiempo actual
  ciudadBuscada: string = ''; // propiedad para almacenar la ciudad buscada
  resultados: TiempoActualResponse | null = null; // propiedad para almacenar los resultados de la búsqueda
  cargando: boolean = false; 
  error: string = '';

  constructor(private tiempoService: TiempoServiceService,
  private favoritosService: FavoritosService
  ) {} // inyectar el servicio de tiempo
  // paso 4 creamos la funcion buscar y creamos la logica de ella
  buscar(): void {
    // Validacion básica de la entrada
    if(!this.ciudadBuscada.trim()) { 
      this.error = 'Por favor, ingrese una ciudad.';
      return;
  }
  // preparamos , reseteamos los estados
  this.cargando = true; // activamos el indicador de carga
  this.error = ''; // limpiamos errores previos
  this.resultados = null; // limpiamos resultados previos

  // llamamos al servicio para obtener el tiempo de la ciudad buscada
  this.tiempoService.getTiempoPorCiudad(this.ciudadBuscada).subscribe({
    next: (datos) => {
      // exito , guardamos los datos recibidos
      this.resultados = datos;
      this.cargando = false; // desactivamos el indicador de carga
    },
    error: (err) => {
      // manejo de errores mostramos mensaje adecuado
      this.error = 'Ciudad no encontrada revise el nombre e intente de nuevo.';
      this.cargando = false; // desactivamos el indicador de carga
  }
    });
  }

  //Favoritos 
  // método que usas en el template: (click)="toggleFavorito(resultados.name)"
  toggleFavorito(ciudad: string) {
    if (this.favoritosService.esFavorito(ciudad)) {
      this.favoritosService.eliminarFavorito(ciudad);
    } else {
      this.favoritosService.agregarFavorito(ciudad);
    }
  }
  esFavorito(ciudad: string): boolean {
  return this.favoritosService.esFavorito(ciudad);
}

}
