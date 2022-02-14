import { Cancion } from "./cacancion";

export class Disco{

    constructor(
        public titulo: string,
        public artista: string,
        public anyo: string,
        public imagen: string,
        public canciones: Array<Cancion>){
            
    }
}