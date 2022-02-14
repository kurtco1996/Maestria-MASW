import { Component, NgModuleDecorator, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public titulo:string;
  public pulsaciones:number;

  constructor() {
    this.titulo = "Universidad internacional de valencia";
    this.pulsaciones = 0;
  }

  ngOnInit(): void {
  }

  pulsar(): void{
    this.pulsaciones++;
    console.log("boton pulsado");
  }

  reset(): void{
    this.pulsaciones=0;
  }

}
