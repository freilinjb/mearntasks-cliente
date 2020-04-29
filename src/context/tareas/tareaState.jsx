import React, {useReducer} from 'react';
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO, 
    AGERGAR_TAREAS,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {
    const initialState = {
        tareasproyecto: [], //para cuando el usuario seleccione una tarea
        errortarea: false,
        tareaseleccionada: null
    }

    //crear dispath y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //Crear las funciones

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {

        //Cuando se seleccione un proyecto se ejecuta esto
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Agregar una tarea al proyecto seleccionado
    const agrergarTarea = async tarea => {
        
        try {
            const resultado = await clienteAxios.post('/api/tareas/', tarea);
            console.log(resultado);
            
            dispatch({
                type:AGERGAR_TAREAS,
                payload: tarea
            });
        } catch (error) {
            console.log(error);
            
        }
    }

    //validar y mostrar un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type:VALIDAR_TAREA
        });
    }

    const eliminarTarea = async (id, proyecto) => {
        
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Editar o modifica una tarea
    const actualizarTarea = async tarea => {
        
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            console.log(resultado.data.tarea);
            
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            });
        } catch (error) {
            console.log(error);
            
        }
        

    }

    //Extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }



    //Elimina la tarea seleccionada
    const limpiarTarea=() => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agrergarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}>
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;