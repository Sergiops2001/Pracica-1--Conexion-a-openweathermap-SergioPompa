import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router'; // importar provideRouter para configurar las rutas

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), //añadimos el proveedor de rutas
      provideHttpClient()] //añadimos el proveedor de HttpClient para hacer peticiones HTTP a la API
};
