import {
    REGISTRO_EXITOSO, 
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CESSAR_SESION
} from '../../types/index';


export default (state, action) => {
    switch(action.type) {
        case LOGIN_EXITOSO: //Es lo mismo 
        case REGISTRO_EXITOSO://Se guarda token en el LocalStorage
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                autenticado: true,
                mensaje:null,//Mostrar mensaje de adventencia manejado con el state
                cargando: false
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,//Se va a llenar cuando se inicia sesion en el state Context, ext component
                cargando: false 
            }
            //No hay state porque solo habra alerta en el Context
        case CESSAR_SESION:
        case LOGIN_ERROR://Realizan la mismo operacion, en caso de que haya un error reiniciar el token
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                usuario: null,//Cuando se cierre sesion el usuario tiene que volver a null
                autenticado: null,
                mensaje: action.payload,//se maneta con el authState
                cargando: false
            }
        default:
            return state;
    }
}