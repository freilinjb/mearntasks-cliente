import React,{useContext, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

//Eso dice que este componente va a tener otro componente dentro
const RutaPrivada = ({component: Component, ...props}) => {

    const authContext = useContext(AuthContext);
    const {autenticado, cargando, usuarioAutenticado }  = authContext;

    useEffect(() => {
        usuarioAutenticado(); 
        // eslint-disable-next-line
    },[])

    return (
        <Route {...props} render={ props => !autenticado && !cargando? 
        (
            // //Lo envia a la pagina principal 
            // //Si no esta autenticado lo redirecciona
            <Redirect to="/"/>
        ) :
        (
            // //Implicito
            <Component {...props} />
        ) }/>
      );
}
 
export default RutaPrivada;
