import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { PieComponent } from './components/pie/pie.component';
import { MusicaComponent } from './components/musica/musica.component';
import { CineComponent } from './components/cine/cine.component';
import { LibrosComponent } from './components/libros/libros.component';
import { PodcastsComponent } from './components/podcasts/podcasts.component';
import { routing } from './app-routing';
import { ErrorComponent } from './components/error/error.component';
import { CancionComponent } from './components/cancion/cancion.component';
import { PipeSeguro, ReproductorYoutubeComponent } from './components/reproductor-youtube/reproductor-youtube.component';
import { ListaReproduccionYoutubeComponent } from './components/reproductor-youtube/lista-reproduccion-youtube/lista-reproduccion-youtube.component';
import { VideosComponent } from './components/videos/videos.component';
import { LibroComponent } from './components/libros/libro/libro.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CabeceraComponent,
    NavegacionComponent,
    PieComponent,
    MusicaComponent,
    CineComponent,
    LibrosComponent,
    PodcastsComponent,
    ErrorComponent,
    CancionComponent,
    ReproductorYoutubeComponent,
    ListaReproduccionYoutubeComponent,
    PipeSeguro,
    VideosComponent,
    LibroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
