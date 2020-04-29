import React,{ useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import LIstadoTareas from '../tareas/LIstadoTareas';
import AuthContext from '../../context/autenticacion/authContext'

const Proyectos = () => {

    //Extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    //Carga la informacion del usuario autenticado
    const { usuarioAutenticado } = authContext

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    },[]);


    return ( 
        <div className="contenedor-app">
            <Sidebar/>

        {/* Administrar nuestras tareas */}
            <div className="seccion-principal">
                <Barra/>
                <main>
                    <FormTarea/>
                    <div className="contenedor-tareas">
                        <LIstadoTareas/>
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;