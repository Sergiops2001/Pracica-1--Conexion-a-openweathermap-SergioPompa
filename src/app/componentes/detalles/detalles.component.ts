import { Component, OnInit } from '@angular/core';
import { TiempoServiceService } from '../../servicios/tiempo-service.service';
import { TiempoActualResponse } from '../../interfaces/tiempo';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { TiempoActualItemComponent } from '../tiempo-actual-item/tiempo-actual-item.component';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles.component.html',
  styles: ''
})
export class DetallesComponent implements OnInit {
  ciudad: string = '';
  datosTiempo: TiempoActualResponse | null = null;
  cargando: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private tiempoService: TiempoServiceService
  ){}


  ngOnInit(): void {
    //Obtener el parametro 'ciudad' usando snapshot 
    this.ciudad = this.route.snapshot.paramMap.get('ciudad') || '';
    // verificar si hay ciudad 
    if (!this.ciudad){
      this.error = 'No hay ciudad'
      this.cargando = false;
      return;
    }
    //si hay ciudad llamar al servicio para obtener los datos 
    this.tiempoService.getTiempoPorCiudad(this.ciudad).subscribe({
  // 3. Manejar la respuesta (guardar datos en this.datosTiempo)
  next: (datos) => {
    this.datosTiempo = datos;
    this.cargando = false;
  },

  // 4. Manejar errores (guardar mensaje en this.error)
  error: (err) => {
    this.error = 'No se pudieron obtener los detalles solicitados';
    this.cargando = false; // desactivamos el indicador de carga;
  }

  // 5. Cambiar this.cargando a false en ambos casos

  }
)}}
