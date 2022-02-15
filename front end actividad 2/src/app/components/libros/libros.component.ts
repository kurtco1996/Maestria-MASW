import { Component, OnInit } from '@angular/core';
import { ServicioLibros } from './services/libros.services';

class Libro{
  titulo="";
  autor="";
  constructor(titulo:string,autor:string){
    this.titulo=titulo;
    this.autor=autor;
  }
}

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  numero_max=10;
  libros:Array<Libro>=[];

  constructor(private servicioLibros:ServicioLibros){ }
  buscar(busqueda:string){
    this.servicioLibros.buscarLibros('harry').subscribe((data:any) => {
      var i=0;
      var extra=0;
      while(i < data.totalItems && i< this.numero_max+extra){
        //console.log(data.items[i].volumeInfo);
        try{
          var titulo:string=data.items[i].volumeInfo.title;
          var autor:string=data.items[i].volumeInfo.authors[0];
          this.libros.push(new Libro(titulo,autor));
          i++;
        }catch{
          i++;
          extra++;
          continue
        }
      }
      console.log(this.libros,i,extra)
    });
  }

  ngOnInit(): void {
  }

}
