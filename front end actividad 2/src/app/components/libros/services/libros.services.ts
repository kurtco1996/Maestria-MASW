import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root' //REVISAR QUE ES ESTO
}) export class ServicioLibros{
    urlBase='https://www.googleapis.com/books/v1/volumes?q=';
    constructor(private http: HttpClient){}
    buscarLibros(busqueda:string){
      var urlFinal=this.urlBase+busqueda;
      return this.http.get(urlFinal);
    }
  
  }