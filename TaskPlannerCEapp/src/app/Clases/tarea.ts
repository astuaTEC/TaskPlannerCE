import { Colaborador } from "./colaborador";

export class Tarea {
    public constructor(
        public nombre: string,
        public idEstado: number,
        public descripcion: string,
        public fechaInicio: string,
        public fechaFinalizacion: string,
        public encargados: Colaborador[],
        public dependencias: string[]
    ){}
}
