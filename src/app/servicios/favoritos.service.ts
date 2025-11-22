import { Injectable } from '@angular/core';
import { CiudadFavorita } from '../interfaces/ciudad-favorita';


@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private ciudadesFavoritas: CiudadFavorita[] = [];
  // el constructor llama a cargarLocalStorage
    constructor() {
    this.cargarLocalStorage();
  }
  //funciones necesarias de favoritos 
  agregarFavorito(ciudad: string){
    //Verificar si existe 
    const existe = this.ciudadesFavoritas.some(c => c.ciudad === ciudad) //compara si la ciudad ya existe
    if (!existe) {
      //Añadir a favoritos 
      const nuevaCiudad: CiudadFavorita = { 
        ciudad: ciudad,
        pais: 'España',
        fechaAgregado: new Date()
      };
      this.ciudadesFavoritas.push(nuevaCiudad)
      this.guardarLocalStorage();
      return true;
    }
    else{
      //no añadir a favoritos 
      return false;
    }
  }

  eliminarFavorito(ciudad: string){
    // 1. Encontrar el índice de la ciudad
    const indice = this.ciudadesFavoritas.findIndex(i => i.ciudad == ciudad) // Buscamos la posicion en la que esta la ciudad, si no encuentra nada retorna -1
    // 2. Si  no existe (índice == -1), osea que si encontre la ciudad elimina 1 elemento en la posición indice
    if (indice !== -1){ this.ciudadesFavoritas.splice(indice, 1)
      this.guardarLocalStorage();
      return true;
    }
    // 3. Retornar si se eliminó o no
  else{ return false;
  }
  }

  obtenerFavoritos(): CiudadFavorita[] {
    return this.ciudadesFavoritas;
  }

  //verfificar si ya esta en favoritos 

  esFavorito(ciudad: string){
    return this.ciudadesFavoritas.some(c => c.ciudad === ciudad) //compara si la ciudad ya esta en la lista de favoritos 


  }

  guardarLocalStorage(){
    const datos = JSON.stringify(this.ciudadesFavoritas) // guardamos en una variable las ciudades favoritas 
    localStorage.setItem('ciudadesFavoritas', datos) // guarda el string datos en localStorage con la clave ciudadesFavoritas 
  }

  cargarLocalStorage() {
    const datos = localStorage.getItem('ciudadesFavoritas'); // recupera los datos del local storage 
    if (datos) {
        this.ciudadesFavoritas = JSON.parse(datos); // si existen datos los convierte a array y lo asigna a this.ciudadesFavoritas para restaurar los favoritos 
    }
}


}
