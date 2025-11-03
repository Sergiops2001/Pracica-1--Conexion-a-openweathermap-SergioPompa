// creamos la interfaz Tiempo para representar los datos del tiempo
export interface Tiempo {
    ciudad: string;
    temperatura: number;
    descripcion: string;
    icono: string;
    viento: number;
}

// Respuesta REAL del endpoint /data/2.5/weather
export interface TiempoActualResponse {
  name: string; // "Madrid"
  weather: { description: string; icon: string; id: number; main: string }[];
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number };
  wind: { speed: number; deg: number; gust?: number };
  clouds?: { all: number };
  rain?: { ['1h']?: number; ['3h']?: number };
  snow?: { ['1h']?: number; ['3h']?: number };
  sys: { country: string; sunrise: number; sunset: number };
  dt: number;
  timezone: number;
}

