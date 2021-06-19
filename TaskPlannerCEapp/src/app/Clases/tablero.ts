import {Colaborador} from 'src/app/Clases/colaborador'
import {Profesor} from 'src/app/Clases/profesor'

export class Tablero {
    public constructor(
        public nombre: string,
        public tipo: string,
        public creador: string,
        public descripcion: string,
        public colaboradores: Colaborador[],
        public observadores: Profesor[]
    ){}
}
