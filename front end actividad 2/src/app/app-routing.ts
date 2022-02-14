import { Component, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { InicioComponent } from "./components/inicio/inicio.component";
import { MusicaComponent } from "./components/musica/musica.component";
import { CineComponent } from "./components/cine/cine.component";
import { LibrosComponent } from "./components/libros/libros.component";
import { ErrorComponent } from "./components/error/error.component";
import { PodcastsComponent } from "./components/podcasts/podcasts.component";

const appRoutes: Routes= [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'musica', component: MusicaComponent},
    {path: 'cine', component: CineComponent},
    {path: 'cine/:genero', component: CineComponent},
    {path: 'libros', component: LibrosComponent} ,
    {path: 'podcasts', component: PodcastsComponent},
    {path: '**', component: ErrorComponent}
];

export const routing: ModuleWithProviders<Object> = RouterModule.forRoot(appRoutes);
