//modulo impuras.ts
//Este archivo tiene las funciones impuras

import { Tarea, DatosTarea } from "./data";
import { input } from "./entradas";
import { formatearTareasPura, buscarTareaPorTituloPura, validarYTransformarEstadoPura, validarDificultadPura, validarVencimientoPuro, generarMensajeBusquedaPura, generarMensajeConfirmacionEliminarPuro, generarPromptDescripcionPura, generarPromptEstadoPura, generarPromptDificultadPura } from "./puras";

export function agregarTareaImpura(): DatosTarea | null {
  console.log("\n=== Creando una nueva tarea ===");

  // 1. Título
  let titulo: string = input("1. Ingresa el título: ");
  if (!titulo || titulo.trim() === "") {
    console.log("El título no puede estar vacío. Operación cancelada.");
    return null;
  }

  // 2. Descripción
  let descripcion: string = input("2. Ingresa la descripción: ");
  if (!descripcion || descripcion.trim() === "") {
    descripcion = "Sin descripción";
  }

  // 3. Estado
  let estado: string | null = null;
  while (true) {
    let est: string = input(
      "3. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): "
    );
    estado = validarYTransformarEstadoPura(est);
    if (estado) {
      break;
    }
    console.log("Opción inválida. Usa P, E, T o C.");
  }

  // 4. Dificultad
  let dificultad: number = 0; // Default
  while (true) {
    let difUser: string = input("4. Dificultad ([1] / [2] / [3]): ");
    const difValidada = validarDificultadPura(difUser);
    if (difValidada !== null) {
      dificultad = difValidada;
      break;
    }
    console.log("Opción inválida. Ingresa 1, 2 o 3.");
  }

  // 5. Vencimiento
  let vencimientoUser: string = input(
    "5. Vencimiento (YYYY-MM-DD) o deja en blanco: "
  );
  let vencimiento: Date | null = validarVencimientoPuro(vencimientoUser);
  if (vencimientoUser.trim() !== "" && vencimiento === null) console.log("Fecha inválida, se asigna 'null'.");

  console.log("\n¡Datos recolectados!\n");

  const datosIncompletos: Omit<DatosTarea, 'creacion' | 'edicion'> = {
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    estado: estado!,
    dificultad: dificultad,
    vencimiento: vencimiento,
  };
  return datosIncompletos as DatosTarea;
}

//Función impura que muestra una lista de tareas en la consola.

export function visualizarTareasImpura(lista: Tarea[]): void {
  // 1. Llama a la función pura para obtener el texto formateado.
  const textoFormateado = formatearTareasPura(lista);
  // 2. Realiza la única acción impura: imprimir en consola.
  console.log(textoFormateado);
}

/**
 * Función impura que pide al usuario un título, busca la tarea y muestra el resultado.
 * @param lista La lista de tareas donde buscar.
 */
export function buscarYMostrarTareaImpura(lista: Tarea[]): void {
  console.log("\n=== Buscar una tarea ===");
  const titulo = input("Ingresa el título de la tarea a buscar: ");

  // 1. Llama a la función pura para la lógica de búsqueda.
  const tareaEncontrada = buscarTareaPorTituloPura(lista, titulo);

  // 2. Llama a la función pura para generar el mensaje de resultado.
  const mensaje = generarMensajeBusquedaPura(tareaEncontrada, titulo);

  // 3. Realiza la acción impura de mostrar el mensaje.
  console.log(mensaje);
}


//Función impura se encarga de la edición de una tarea.
//Pide al usuario el título de la tarea a editar y los nuevos datos.
export function editarTareaImpura(lista: Tarea[]): { titulo: string; nuevosDatos: Partial<DatosTarea> } | null {
  console.log("\n=== Editar una tarea ===");
  if (lista.length === 0) {
    console.log("No hay tareas para editar.");
    return null;
  }

  const titulo = input("Ingresa el título de la tarea a editar: ");
  const tareaExistente = buscarTareaPorTituloPura(lista, titulo);

  if (!tareaExistente) {
    console.log(`No se encontró ninguna tarea con el título "${titulo}".`);
    return null;
  }

  console.log("Tarea encontrada. Ingresa los nuevos valores (deja en blanco para no cambiar).");
  
  const nuevosDatos: Partial<DatosTarea> = {};

  const promptDesc = generarPromptDescripcionPura(tareaExistente.descripcion);
  const nuevaDescripcion = input(promptDesc);
  if (nuevaDescripcion.trim() !== "") {
    nuevosDatos.descripcion = nuevaDescripcion;
  }

  while (true) {
    const promptEst = generarPromptEstadoPura(tareaExistente.estado);
    let est: string = input(promptEst);
    if (est.trim() === '') break;
    const estadoValidado = validarYTransformarEstadoPura(est);
    if (estadoValidado) {
      nuevosDatos.estado = estadoValidado;
      break;
    }
    console.log("Opción inválida. Usa P, E, T o C.");
  }

  while (true) {
    const promptDif = generarPromptDificultadPura(tareaExistente.dificultad);
    let difUser: string = input(promptDif);
    if (difUser.trim() === '') break; // El usuario no quiere cambiar la dificultad
    const difValidada = validarDificultadPura(difUser);
    if (difValidada !== null) {
      nuevosDatos.dificultad = difValidada;
      break;
    }
    console.log("Opción inválida. Ingresa 1, 2 o 3.");
  }

  // Si el usuario no ingresó ningún dato nuevo, no hay nada que hacer.
  if (Object.keys(nuevosDatos).length === 0) {
    console.log("No se ingresaron datos nuevos. Operación cancelada.");
    return null;
  }

  return { titulo: tareaExistente.titulo, nuevosDatos };
}


//Función impura que gestiona la eliminación de una tarea.
//Pide al usuario el título y una confirmación.
export function eliminarTareaImpura(lista: Tarea[]): string | null {
  console.log("\n=== Eliminar una tarea ===");
  if (lista.length === 0) {
    console.log("No hay tareas para eliminar.");
    return null;
  }

  const titulo = input("Ingresa el título de la tarea a eliminar: ");
  const tareaExistente = buscarTareaPorTituloPura(lista, titulo);

  if (!tareaExistente) {
    console.log(`No se encontró ninguna tarea con el título "${titulo}".`);
    return null;
  }

  // Genera el mensaje de confirmación con una función pura.
  const mensajeConfirmacion = generarMensajeConfirmacionEliminarPuro(tareaExistente);
  const confirmacion = input(mensajeConfirmacion);

  return confirmacion.toLowerCase() === 's' ? tareaExistente.titulo : null;
}
