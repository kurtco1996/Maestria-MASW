import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-cine',
  templateUrl: './cine.component.html',
  styleUrls: ['./cine.component.css']
})
export class CineComponent implements OnInit {

  public genero:String = "";

  constructor(private route: ActivatedRoute) {
  }

  //OnInit se ejecuta dspues del constructor
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.genero = params['genero'];
      console.log("El genero es: ", params["genero"]);
    })
  }

}
