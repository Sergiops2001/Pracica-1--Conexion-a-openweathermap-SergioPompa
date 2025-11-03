import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { TiempoServiceService } from '../../servicios/tiempo-service.service';
import { TiempoActualItemComponent } from '../tiempo-actual-item/tiempo-actual-item.component';
import { TiempoActualResponse } from '../../interfaces/tiempo'; // importar la interfaz TiempoActualResponse
import { ForecastResponse } from '../../interfaces/forecast'; // importar la interfaz ForecastResponse
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, TiempoActualItemComponent, DecimalPipe, DatePipe],
  templateUrl: './home.component.html'
})
// Componente Home que consumme el servicio de tiempo y muestra la información del tiempo actual
export class HomeComponent implements OnInit {
  public resultadosTiempo$!: Observable<TiempoActualResponse>;
  public resultadosForecast$!: Observable<ForecastResponse>;
  
  constructor(private service: TiempoServiceService) { }

  ngOnInit(): void {
    this.resultadosTiempo$ = this.service.getTiempoInfo();
    this.resultadosForecast$ = this.service.getForecast();
  }
  //Paso 3 modificar el componente home , creando la propiedad resultadosForecast$ y llamando al método getForecast del servicio en el ngOnInit
//Paso 6.1 Mejorar el metodo para que agrupe los datos por días y seleccione solo uno por día (12:00 PM)
  // MÉTODO MEJORADO: Agrupa por día y selecciona el periodo del mediodía (12:00)
  agruparPorDia(forecast: ForecastResponse): any[] {
    const diasUnicos: any[] = [];
    const fechasProcesadas = new Set();

    forecast.list.forEach(item => {
      // Extraemos solo la fecha (sin hora)
      const fechaCompleta = item.dt_txt;
      const fecha = fechaCompleta.split(' ')[0]; // "2025-11-02"
      const hora = fechaCompleta.split(' ')[1];  // "15:00:00"
      
      // Solo procesamos si es la primera vez que vemos esta fecha
      // Y preferimos el periodo del mediodía (12:00) para mejor representación
      if (!fechasProcesadas.has(fecha)) {
        // Buscamos el elemento más cercano al mediodía (12:00)
        const elementosDelDia = forecast.list.filter(i => 
          i.dt_txt.split(' ')[0] === fecha
        );
        
        // Seleccionamos el más cercano a las 12:00
        const elementoMediodia = elementosDelDia.reduce((prev, curr) => {
          const horaPrev = parseInt(prev.dt_txt.split(' ')[1].split(':')[0]);
          const horaCurr = parseInt(curr.dt_txt.split(' ')[1].split(':')[0]);
          return Math.abs(horaCurr - 12) < Math.abs(horaPrev - 12) ? curr : prev;
        });

        diasUnicos.push({
          fecha: elementoMediodia.dt_txt,
          temperatura: elementoMediodia.main.temp,
          descripcion: elementoMediodia.weather[0].description,
          icono: elementoMediodia.weather[0].icon,
          viento: elementoMediodia.wind.speed
        });

        fechasProcesadas.add(fecha);
      }
    });

    return diasUnicos.slice(0, 5); // Solo 5 días
  }
}