//Paso numero 1: crear la interfaz forecast.ts para manejar los datos del pronóstico del tiempo
// Interface para la respuesta COMPLETA de la API (solo la usa el servicio)
export interface ForecastResponse {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
    };
    dt_txt: string;
  }[];
  city: {
    name: string;
  };
}

// Interface SIMPLIFICADA para los componentes
export interface Forecast {
  fecha: string;        // Fecha en formato legible
  temperatura: number;  // Temperatura actual  
  descripcion: string;  // Descripción del clima
  icono: string;        // Icono del clima
  viento: number;       // Velocidad del viento
}