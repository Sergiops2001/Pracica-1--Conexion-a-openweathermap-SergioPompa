import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { TiempoServiceService } from '../../servicios/tiempo-service.service';
import { TiempoActualResponse } from '../../interfaces/tiempo';
import { TiempoActualItemComponent } from '../tiempo-actual-item/tiempo-actual-item.component';
import { RouterLink } from '@angular/router';

// Paso 2 importar lo necesario para el componente de búsqueda y crear la estructura básica
@Component({
  selector: 'app-busqueda',
  imports: [CommonModule, FormsModule,TiempoActualItemComponent, RouterLink],
  templateUrl: './busqueda.component.html',
  styles: ``
})
export class BusquedaComponent { // Componente de búsqueda de ciudades para obtener el tiempo actual
  ciudadBuscada: string = ''; // propiedad para almacenar la ciudad buscada
  resultados: TiempoActualResponse | null = null; // propiedad para almacenar los resultados de la búsqueda
  cargando: boolean = false; 
  error: string = '';

  constructor(private tiempoService: TiempoServiceService) {} // inyectar el servicio de tiempo
  // paso 4 creamos la funcion buscar y creamos la logica de ella
  buscar() {
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
    
}
  )}}
