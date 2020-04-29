import {
    MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types/index';

export default (state, action) => {
    switch(action.type) {
        case MOSTRAR_ALERTA:
            return {
                alerta: action.payload
            }
            //No hay state porque solo habra alerta en el Context
        case OCULTAR_ALERTA: 
            return{
                alerta: null
            }
        default:
            return state;
    }
}