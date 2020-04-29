import React,{useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const Tarea = ({tarea}) => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //obtener la funcion del context
    const tareasContext = useContext(tareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;
 
    //Extraer el proyecto
    const [proyectoActual] = proyecto;


    //Funcion que se ejecuta cuando el usuario presiona btn eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        // obtenerTareas(proyecto[0].id); //Otra forma
        obtenerTareas(proyectoActual.id);
        
    }

    //Funcion que modifica el estado de las tareas
    const cambiarEstado =tarea => {
        // if(tarea.estado) {
        //     tarea.estado = false;
        // } else {
        //     tarea.estado = true;
        // }
  
        tarea.estado = (tarea.estado) ? false : true;
        actualizarTarea(tarea);
    }

    //Agrerga una tarea actual cuandl el usuario desa editarlo
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                { tarea.estado 
                ?
                    (
                        <button type="button" className="completo" onClick={()=> cambiarEstado(tarea)}>Completo</button>
                    )
                :    
                    (
                        <button type="button" className="incompleto" onClick={()=> cambiarEstado(tarea)}>Incompleto</button>
                    )
                }
            </div> 

            <div className="acciones">
                <button type="button" 
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}>Editar</button>

                <button type="button" 
                    className="btn btn-secuntario"
                    onClick={() => tareaEliminar(tarea._id)}>Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;