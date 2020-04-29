import React,{ useReducer} from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS, 
    AGRERGAR_PROYECTO,
    PROYECTO_ERROR,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO } from '../../types';

import clienteAxios from '../../config/axios';


//Para cambiar el state del form para habilitar el formulario
const ProyectoState = props => {
   
    

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    //Dispatch para ejecutar las acciones.
    //useReducer es el remplazo de redux

    //dispath va a ejecutar los diferentestes type para ejecutarlo en el proyectoReducer
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //TODO Serie de funciones para el CRUD del proyecto
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    }

    //TODO Obtener los proyectos
    const obtenerProyectos = async () => {
        try {

            const resultado = await clienteAxios.get('/api/proyectos');


            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
                //El payload siempre es lo que toma de parametro 
            });
        } catch (error) {
            // console.log(error);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }


    //TODO Agregar nuevo proyecto
    const agrergarProyecto = async proyecto => {
        //Esta parte no es necesaria porque el id se genera por mongo
        // proyecto.id = uuidv4(); 

        //Insertar el proyecto en el state
        try {

            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado);
            

            dispatch({
                type: AGRERGAR_PROYECTO,
                payload: resultado.data
            });
        } catch (error) {
            // console.log(error);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });   
        }
    }

    //TODO Validar el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Selecciona el proyecto que el suario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Elimina un proyecto
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            });
        } catch (error) {
            // console.log(error);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
            
        }
    }

    //Creamos el provider para importarlo en el APP
    return (
        <proyectoContext.Provider 
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario, 
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agrergarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
} 

export default ProyectoState;