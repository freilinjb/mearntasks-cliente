import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const Login = (props) => {
    //extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;
    

    //Copiado de NuevaCuenta: En caso de que password o usuario no exista
    useEffect(() => {
        if(autenticado){ 
            props.history.push('/proyectos');
        } 
        
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    },[mensaje, autenticado, props.hostory]);

    //State para iniciar sesion
    const [usuario, setUsuario] = useState({
        email:'',
        password:''
    });

    //extraer del usuario

    const { email, password } = usuario; 

    const onChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    }

    //Cuandl el usuario quere iniciaonSubmitr sesion
    const onSubmit =e=> {
        e.preventDefault();

        //validar campos
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        //Pasarlo al action
        iniciarSesion({email, password});
    }
    return ( 
        <div className="form-usuario">
        { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>)  : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="">Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            className="form-control" 
                            placeholder="Tu email"
                            value={email}
                            onChange={onChange}
                        />
                    </div> 
                    <div className="campo-form">
                        <label htmlFor="">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="form-control" 
                            placeholder="Tu password"
                            value={password}
                            onChange={onChange}
                        />
                    </div> 
                    <input type="submit" value="Iniciar Sesion" className="btn btn-primario btn-block"/>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;