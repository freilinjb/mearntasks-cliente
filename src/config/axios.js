import axios from 'axios';

//Recomendaciones para realizar las consultas
const clienteAxios = axios.create({
    //Registrar la variable de entorno en produccion
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export default clienteAxios;