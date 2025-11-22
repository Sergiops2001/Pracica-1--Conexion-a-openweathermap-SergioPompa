import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TiempoActualResponse } from '../interfaces/tiempo';
import { environment } from '../../environments/environments';
import { ForecastResponse } from '../interfaces/forecast';

@Injectable({
  providedIn: 'root'
})
export class TiempoServiceService {

  constructor(private http: HttpClient) { } // inyectamos HttpClient para hacer peticiones HTTP

  // método para obtener la información del tiempo actual de una ciudad

  getTiempoInfo(): Observable<TiempoActualResponse> {
    const url = 'https://api.openweathermap.org/data/2.5/weather' // endpoint de OpenWeatherMap para el tiempo actual
    return this.http.get<TiempoActualResponse>(url,{
      // parámetros de la petición que hemos determinado antes en tiempo.ts 
      params: {
        q: 'Madrid,es',
        units: 'metric',
        lang: 'es',
        appid: environment.OWM_API_KEY
      }
      
    });

  }
  //paso 2 crear método para obtener el pronóstico del tiempo con los parámetros necesarios
getForecast(): Observable<ForecastResponse> {
  const url = 'https://api.openweathermap.org/data/2.5/forecast';
  return this.http.get<ForecastResponse>(url, {
    params: {
      q: 'Madrid,es',
      units: 'metric',
      lang: 'es',
      appid: environment.OWM_API_KEY
    }
  });
}
// paso 4 crear un nuevo metodo para obtener el tiempo por nombre de la ciudad 
// metodo para busqueda por ciudad 
getTiempoPorCiudad(ciudad: string): Observable<TiempoActualResponse> {
  const url = 'https://api.openweathermap.org/data/2.5/weather' // endpoint de OpenWeatherMap para el tiempo actual
  return this.http.get<TiempoActualResponse>(url,{
      // parámetros de la petición que hemos determinado antes en tiempo.ts 
      params: {
        q: `${ciudad}`,
        units: 'metric',
        lang: 'es',
        appid: environment.OWM_API_KEY
      }
})}}