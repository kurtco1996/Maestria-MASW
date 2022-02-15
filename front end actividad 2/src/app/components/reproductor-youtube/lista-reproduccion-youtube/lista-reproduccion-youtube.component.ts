import { Component, OnInit } from '@angular/core';
class Video{
  private url:string;
  private titulo:string;
  constructor(url:string,titulo:string){
    this.url='https://www.youtube.com/embed/'+url;
    this.titulo=titulo;
  }
  getUrl():string{
    return this.url;
  }
  getTitulo():string{
    return this.titulo;
  }
}


@Component({
  selector: 'app-lista-reproduccion-youtube',
  templateUrl: './lista-reproduccion-youtube.component.html',
  styleUrls: ['./lista-reproduccion-youtube.component.css']
})
export class ListaReproduccionYoutubeComponent implements OnInit {
  listaVideos=[
    new Video('MRIv2IwFTPg','¿Qué es una Red Neuronal? Parte 1 : La Neurona | DotCSV'),
    new Video('uwbHOpp9xkc','¿Qué es una Red Neuronal? Parte 2 : La Red | DotCSV'),
    new Video('eNIqz_noix8','¿Qué es una Red Neuronal? Parte 3 : Backpropagation | DotCSV'),
    new Video('M5QHwkkHgAA','¿Qué es una Red Neuronal? Parte 3.5 : Las Matemáticas de Backpropagation | DotCSV')
  ];
  videoSeleccionado=0;

  constructor() { }
  seleccionarVideo(i:number){
    this.videoSeleccionado=i;
  }

  ngOnInit(): void {
  }

}
