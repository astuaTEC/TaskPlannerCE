import { Tarea } from "./tarea";

export class EstadoCompletitud {
    public constructor(
        public id: number,
        public nombre: string,
        public tareas: Tarea[]
    ){}
}
