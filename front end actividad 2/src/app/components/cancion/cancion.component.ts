import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Cancion } from 'src/app/models/cacancion';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
  styleUrls: ['./cancion.component.css']
})
export class CancionComponent implements OnInit {

  @Input() cancion: Cancion = new Cancion(0, 'titulo', 'artista', 'ruta');
  @Output() cancionAReproducir = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  reproducir(event:Event, cancion: Cancion){
      this.cancionAReproducir.emit(cancion);
  }
}
