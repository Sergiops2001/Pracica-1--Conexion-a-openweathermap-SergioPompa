import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../../servicios/favoritos.service';
import { CiudadFavorita } from '../../interfaces/ciudad-favorita';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  imports: [CommonModule, RouterLink],
  templateUrl: './favoritos.component.html',
  styles: ``
})
export class FavoritosComponent implements OnInit {

  listaFavoritos: CiudadFavorita[] = []; // componente para guardar el array de favoritos

  constructor(
    private favoritosService: FavoritosService
  ){}
  
  //Llamamos al metodo obtener favoritos
  ngOnInit(): void {
    this.obtenerFavoritos();
  }

  //metodo para obtener favoritos
  obtenerFavoritos(){
    this.listaFavoritos = this.favoritosService.obtenerFavoritos()
  }
  //metodo para obtener favoritos
  eliminarFavoritos(ciudad: string){
  this.favoritosService.eliminarFavorito(ciudad)
  this.obtenerFavoritos

  }

}
