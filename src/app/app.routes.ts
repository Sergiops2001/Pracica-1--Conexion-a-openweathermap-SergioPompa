import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { DetallesComponent } from './componentes/detalles/detalles.component';
import { FavoritosComponent } from './componentes/favoritos/favoritos.component';

export const routes: Routes = [
    { 
        //ruta raiz 
        path: '',
        component: HomeComponent
    },
    {
        // http://localhost:4200/busqueda
        path: 'busqueda',
        component: BusquedaComponent
    },
    {
        // http://localhost:4200/detalles/:ciudad
        // modificamos la ruta con ciudad para obtener los detalles de la ciudad que busquemos
        //el siguiente paso sera hacer clickable los resultados para navegar a detalles 
        path: 'detalles/:ciudad',
        component: DetallesComponent
    },
    {
        // http://localhost:4200/favoritos
        path: 'favoritos',
        component: FavoritosComponent
    }
];
