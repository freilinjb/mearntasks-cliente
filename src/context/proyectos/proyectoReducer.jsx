//conteien las funciones que van a interactuar con el state
//Reducer es el remplazo de redux
import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS, 
    AGRERGAR_PROYECTO,
    PROYECTO_ERROR,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO } from '../../types';

//el reducer lo unico que hace es cambiar el state
export default (state, action) => {
    switch(action.type) {
        case FORMULARIO_PROYECTO:
            return{
                ...state,  //toma una copia del state y lo cambia a true
                formulario: true
            }
        case OBTENER_PROYECTOS:
            //Probando que estoy recibiendo
            console.log(action.payload);

            return{
                ...state,
                 proyectos: action.payload
            }

        case  AGRERGAR_PROYECTO:
            return{
                ...state,
                proyectos: [...state.proyectos, action.payload],
                //Esto es un arreglo de objetos
                //formulario oculta el componente NuevoPRoyecto
                formulario:false,
                errorformulario: false //Cuando se registra un dato cambia el para 
                //ocultar el formulario (muy ingenioso)
            }
        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorformulario: true
            }
        case PROYECTO_ACTUAL:
            return{
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
                //Compara el proyecto y lo selecciona
            }

        case ELIMINAR_PROYECTO:
            return {
                ...state,
                //traer los que no sean iguales al que le estas dando click
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                //resetea el listado de Taraae
                proyecto:null
            }
        case PROYECTO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }
}