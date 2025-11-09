//modulo puras.ts aqui iran las funciones puras
//aqui no deben haber mutaciones como "console.log" o "input"

//importamos la interfaz de tareas
import { Tarea, DatosTarea } from "./data";

//Funcion pura que agrega una tarea, recibe la lista vieja y la tarea nueva.
export function agregarTareaPura(lista: Tarea[], tarea: Tarea): Tarea[] {
    //devuelve un array nuevo con la lista vieja y la tarea nueva
 return [...lista, tarea];
}

/**
 * Devuelve un nuevo objeto de tarea actualizado con los nuevos datos.
 * Es una función pura que no modifica la tarea original.
 * @param tarea La tarea original que se va a actualizar.
 * @param nuevosDatos Un objeto con las propiedades a cambiar.
 * @returns Un nuevo objeto de tarea, congelado para asegurar la inmutabilidad.
 */
export function actualizarTareaPura(tarea: Tarea, nuevosDatos: Partial<DatosTarea>): Tarea {
    // Creamos un nuevo objeto de tarea combinando la tarea antigua con los nuevos datos.
    // La fecha de edición se actualiza automáticamente.
    const tareaActualizada: Tarea = {
        ...tarea,
        ...nuevosDatos,
        edicion: new Date(),
    };
    return Object.freeze(tareaActualizada);
}

//Partial<DatosTarea> crea un nuevo tipo donde cada propiedad de una Tarea (como titulo, descripción, estado, etc.) es opcional.
//función espera recibir un objeto (nuevosDatos) que puede contener algunas, todas o ninguna de las propiedades de una Tarea
export function editarTareaPura(lista: Tarea[], titulo: string, nuevosDatos: Partial<DatosTarea>): Tarea[] {
    return lista.map(tarea => 
        tarea.titulo === titulo ? actualizarTareaPura(tarea, nuevosDatos) : tarea
    );
}


export function formatearTareasPura(lista: Tarea[]): string {
    if (lista.length === 0) {
        return "\n--- Mis Tareas ---\nNo tienes tareas pendientes.";
    }

    const cabecera = "\n--- Mis Tareas ---";

    const tareasFormateadas = lista.map((tarea, index) => {
        const detalles = [
            `\nTarea #${index + 1}`,
            "====================",
            `  Título: ${tarea.titulo}`,
            `  Descripción: ${tarea.descripcion}`,
            `  Estado: ${tarea.estado}`,
            `  Dificultad: ${tarea.dificultad}`,
            `  Creada: ${tarea.creacion.toLocaleString()}`,
            `  Última Edición: ${tarea.edicion.toLocaleString()}`,
            tarea.vencimiento ? `  Vencimiento: ${tarea.vencimiento.toLocaleString()}` : null,
            "===================="
        ].filter(Boolean); // Filtra las líneas nulas (como el vencimiento)
        return detalles.join('\n');
    }).join('');

    return `${cabecera}${tareasFormateadas}`;
}

//Busca una tarea por su título en una lista de tareas (ignorando mayúsculas/minúsculas).
//Es una función pura que no modifica la lista original.
export function buscarTareaPorTituloPura(lista: Tarea[], titulo: string): Tarea | undefined {
    return lista.find(tarea => tarea.titulo.toLowerCase() === titulo.toLowerCase());
}


//Elimina una tarea de la lista basándose en su título (ignorando mayúsculas/minúsculas).
//Es una función pura que devuelve una nueva lista sin la tarea especificada.
export function eliminarTareaPura(lista: Tarea[], titulo: string): Tarea[] {
    return lista.filter(tarea => tarea.titulo.toLowerCase() !== titulo.toLowerCase());
}

//Valida y transforma la entrada del usuario para el estado de una tarea.
export function validarYTransformarEstadoPura(est: string): string | null {
    const estadoNormalizado = est.trim().toUpperCase();
    const mapaEstados: { [key: string]: string } = {
        "P": "Pendiente",
        "E": "En Curso",
        "T": "Terminada",
        "C": "Cancelada"
    };
    return mapaEstados[estadoNormalizado] || null;
}

//Valida y transforma la entrada del usuario para la dificultad de una tarea.
export function validarDificultadPura(dif: string): number | null {
    const dificultadNum = parseInt(dif);
    return [1, 2, 3].includes(dificultadNum) ? dificultadNum : null;
}


//Valida y transforma la entrada del usuario para la fecha de vencimiento.
//La entrada del usuario como string (YYYY-MM-DD).Retorna un objeto Date, o null si la entrada está vacía o es inválida.
export function validarVencimientoPuro(fecha: string): Date | null {
    if (fecha.trim() === "") return null;
    const fechaDate = new Date(fecha);
    return isNaN(fechaDate.getTime()) ? null : fechaDate;
}


//Genera un mensaje de resultado para la operación de búsqueda.
export function generarMensajeBusquedaPura(tareaEncontrada: Tarea | undefined, tituloBuscado: string): string {
    if (tareaEncontrada) {
        return "\n¡Tarea encontrada!" + formatearTareasPura([tareaEncontrada]);
    } else {
        return `\nNo se encontró ninguna tarea con el título "${tituloBuscado}".`;
    }
}


//Genera un mensaje de confirmación para la operación de eliminación.
export function generarMensajeConfirmacionEliminarPuro(tarea: Tarea): string {
    return `¿Estás seguro de que deseas eliminar la tarea "${tarea.titulo}"? (s/n): `;
}


//Genera el prompt para solicitar una nueva descripción, mostrando la actual.
export function generarPromptDescripcionPura(descripcionActual: string): string {
    return `Nueva descripción (actual: ${descripcionActual}): `;
}


//Genera el prompt para solicitar un nuevo estado, mostrando el actual.
export function generarPromptEstadoPura(estadoActual: string): string {
    return `Nuevo estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada) (actual: ${estadoActual}): `;
}


//Genera el prompt para solicitar una nueva dificultad, mostrando la actual.
export function generarPromptDificultadPura(dificultadActual: number): string {
    return `Nueva dificultad ([1] / [2] / [3]) (actual: ${dificultadActual}): `;
}

/**
 * Genera el texto del menú principal como una cadena de texto.
 * @returns El string del menú.
 */
export function generarMenuPuro(): string {
    return [
        "\n==== MENÚ PRINCIPAL ====",
        "1. Ver mis tareas",
        "2. Buscar una tarea",
        "3. Agregar una tarea",
        "4. Editar una tarea",
        "5. Eliminar una tarea",
        "0. Salir",
        "==========================\n"
    ].join('\n');
}