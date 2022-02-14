import { Component, OnInit } from '@angular/core';
import { Cancion } from 'src/app/models/cacancion';
import { Disco } from 'src/app/models/disco';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {

public numero:number = 2;
public discos: Array<any>;
public cancionReproducida: Cancion = new Cancion(0, '','','');

  constructor() { 
    this.discos = [
      new Disco("Greatest hits","the beatles","1987",'https://commons.wikimedia.org/wiki/File:The_Fabs.JPG',[
        new Cancion(1,'Hollywood','the beatles','https://cdn.pixabay.com/download/audio/2022/01/31/audio_0f2416122a.mp3?filename=dont-you-think-lose-16073.mp3'),
        new Cancion(2,'Yellow submarine','the beatles','https://cdn.pixabay.com/download/audio/2022/01/31/audio_0f2416122a.mp3?filename=dont-you-think-lose-16073.mp3'),
        new Cancion(3,'Imagine','the beatles','https://cdn.pixabay.com/download/audio/2022/01/31/audio_0f2416122a.mp3?filename=dont-you-think-lose-16073.mp3')
      ]),
      new Disco("Greatest hits","queens",'1989','https://commons.wikimedia.org/wiki/File:The_Fabs.JPG',[
        new Cancion(1,'Hollywood','the beatles','https://cdn.pixabay.com/download/audio/2022/01/31/audio_0f2416122a.mp3?filename=dont-you-think-lose-16073.mp3'),
        new Cancion(2,'Yellow submarine','the beatles','https://cdn.pixabay.com/download/audio/2022/01/31/audio_0f2416122a.mp3?filename=dont-you-think-lose-16073.mp3'),
        new Cancion(3,'Imagine','the beatles','https://cdn.pixabay.com/download/audio/2022/01/31/audio_0f2416122a.mp3?filename=dont-you-think-lose-16073.mp3')
      ]),
      new Disco("Greatest hits","The Cranberries",'1997','https://commons.wikimedia.org/wiki/File:The_Fabs.JPG',[
        new Cancion(1,'Hollywood','the beatles','https://cdn.pixabay.com/download/audio/2022/01/31/audio_0f2416122a.mp3?filename=dont-you-think-lose-16073.mp3'),
        new Cancion(2,'Yellow submarine','the beatles','https://cdn.pixabay.com/download/audio/2022/01/31/audio_0f2416122a.mp3?filename=dont-you-think-lose-16073.mp3'),
        new Cancion(3,'Imagine','the beatles','https://cdn.pixabay.com/download/audio/2022/01/31/audio_0f2416122a.mp3?filename=dont-you-think-lose-16073.mp3')
      ]),
      new Disco("Greatest hits","The Doors",'1982','https://commons.wikimedia.org/wiki/File:The_Fabs.JPG',[
        new Cancion(1,'Hollywood','the beatles','https://cdn.pixabay.com/download/audio/2022/01/31/audio_0f2416122a.mp3?filename=dont-you-think-lose-16073.mp3'),
        new Cancion(2,'Yellow submarine','the beatles','https://cdn.pixabay.com/download/audio/2022/01/31/audio_0f2416122a.mp3?filename=dont-you-think-lose-16073.mp3'),
        new Cancion(3,'Imagine','the beatles','https://cdn.pixabay.com/download/audio/2022/01/31/audio_0f2416122a.mp3?filename=dont-you-think-lose-16073.mp3')
      ]),
    ]
  }

  ngOnInit(): void {
  }

  reproducirCancion(cancion:Cancion){
    console.log('Quiero reproducir la cancion: ', cancion)
    this.cancionReproducida = cancion;
    let audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement;
    audioPlayer?.setAttribute('src', cancion.ruta);
    audioPlayer.play();
  }
}
