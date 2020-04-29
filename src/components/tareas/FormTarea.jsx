import React,{ useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const FormuTarea = () => {

    //Extraer proyectos del state inicial
    const proyectosConext = useContext(proyectoContext);
    const { proyecto } = proyectosConext;
    
    //obtener la funcion del context
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada ,errortarea ,agrergarTarea, validarTarea, obtenerTareas, actualizarTarea,  limpiarTarea} = tareasContext;

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada!== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            });
        }
    }, [tareaseleccionada]);

    //State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    //extraer el nombrer del proyecto
    const { nombre} = tarea;

    //Si no hay un proyecto seleccionado oculta el formulario Tarea
    if(!proyecto) return null;
    //Array destructuring para extraer el proyecto actual
    
    const [proyectoActual]= proyecto;

    //Leer los valores del formulario
    const handleChange =e=> {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit =e=> {
        e.preventDefault();

        //validar
        if(nombre.trim() === '') {
            validarTarea();
            return;
        }
        //Si es edicion o si es nueva tarea
        if(tareaseleccionada === null) {
            //agrergar la nueva tarea al state de las tareas
            tarea.proyecto = proyectoActual._id;
            //El estado lo define mongo por defecto
            agrergarTarea(tarea);
        } else {
            //actualizar tarea existente
            actualizarTarea(tarea);

            //Elimina tarea seleccionada del state
            limpiarTarea();
        }

        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        //reiniciar el form
        guardarTarea({
            nombre:'' 
        });
    }

    return ( 
        <div className="formulario">
            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input type="text" name="nombre" value={nombre} onChange={handleChange} className="input-text" placeholder="Nombre de la Tarea..."/>
                </div> 
                <div className="contenedor-input">
                    <input type="submit" className="btn btn-primario btn-submit btn-block" 
                    value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}/>
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombrer de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default FormuTarea;