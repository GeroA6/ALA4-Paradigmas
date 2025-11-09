//Modulo Data.js, ya no irá un array global, ya que esto nos causará problema con las mutaciones

/*la palabra clave interface en TypeScript, sirve para
definir la forma que debe tener un objeto.
En este caso, Tarea debe ser de la sig. forma*/
export interface Tarea{
    titulo: string;
    descripcion: string;
    estado: string;
    dificultad: number;
    vencimiento: Date | null;
    creacion: Date;
    edicion: Date;
}

export type DatosTarea = Tarea;

export function crearTarea(datos: DatosTarea): Tarea {

    const tareaNueva: Tarea = {
        titulo: datos.titulo,
        descripcion: datos.descripcion,
        estado: datos.estado,
        dificultad: datos.dificultad,
        vencimiento: datos.vencimiento,
        creacion: new Date(),
        edicion: new Date(),
    };

    return Object.freeze(tareaNueva);
}