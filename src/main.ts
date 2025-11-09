//main.ts 
/*Es el encargado de gestionar la lista de tareas
maneja el bucle principal y coordina las funciones puras e impuras*/

import { input } from "./entradas";
import { agregarTareaImpura, visualizarTareasImpura, buscarYMostrarTareaImpura, editarTareaImpura, eliminarTareaImpura } from "./impuras";
import { Tarea, crearTarea } from "./data";
import { agregarTareaPura, editarTareaPura, eliminarTareaPura, generarMenuPuro } from "./puras";

function main(): void {
  let listaDeTareas: Tarea[] = [];

  while (true) {
    console.log(generarMenuPuro())
    let op: string = input("Elija una opción: ");

    switch (op) {
      case "1": {
        visualizarTareasImpura(listaDeTareas);
        input("Presiona cualquier tecla para continuar...\n");
        break;
      }
      case "2": {
        buscarYMostrarTareaImpura(listaDeTareas);
        input("Presiona cualquier tecla para continuar...\n");
        break;
      }
      case "3": {
        const datosCrudos = agregarTareaImpura();
        if (datosCrudos) {
          // Llama a la funcion pura para crear la tarea de data.ts
          //se meten los datos crudos que nos devuelve agregarTareaImpura
          const nuevaTarea = crearTarea(datosCrudos);

          // Llama a la funcion pura que agrega tareas con spreadoperator en puras.ts
          // Esto crea una nueva lista y la reasigna, manteniendo la inmutabilidad en la función pura.
          const nuevaLista = agregarTareaPura(listaDeTareas, nuevaTarea);
          listaDeTareas = nuevaLista;

          console.log("¡Tarea agregada con éxito!");
        }
        input("Presiona cualquier tecla para continuar...\n");
        break;
      }
      case "4": {
        const datosParaEditar = editarTareaImpura(listaDeTareas);
        if (datosParaEditar) {
          // Llama a la función pura para obtener la nueva lista
          const nuevaLista = editarTareaPura(listaDeTareas, datosParaEditar.titulo, datosParaEditar.nuevosDatos);
          // Reasigna el estado principal de la aplicación
          listaDeTareas = nuevaLista;
          console.log("¡Tarea editada con éxito!");
        }
        input("Presiona cualquier tecla para continuar...\n");
        break;
      }
      case "5": {
        const tituloParaEliminar = eliminarTareaImpura(listaDeTareas);
        if (tituloParaEliminar) {
          // Llama a la función pura para obtener la nueva lista
          const nuevaLista = eliminarTareaPura(listaDeTareas, tituloParaEliminar);
          // Reasigna el estado principal de la aplicación
          listaDeTareas = nuevaLista;
          console.log("¡Tarea eliminada con éxito!");
        } else {
          console.log("Operación cancelada.");
        }
        input("Presiona cualquier tecla para continuar...\n");
        break;
      }
      case "0": {
        console.log("¡Adiós!");
        return; // Sale de la función main y termina el programa.
      }
      default: {
        console.log("Opción no válida.");
        input("Presiona cualquier tecla para continuar...\n");
        break;
      }
    }
  }
}

main();