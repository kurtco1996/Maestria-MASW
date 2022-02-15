import { Component, OnInit } from '@angular/core';
import { appRoutes } from 'src/app/app-routing';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  rutas=appRoutes; //TENEMOS LAS RUTAS PARA UN FOR

  constructor() { }

  ngOnInit(): void {
  }

}
