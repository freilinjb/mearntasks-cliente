import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';
//Como usamos usando react router dom el props es para redireccionar 
//se usara en el useEffect
const NuevaCuenta = (props) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    //En caso de que el usuario se haya autenticado o registrao osea un registro duplicado
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        } if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    },[mensaje, autenticado, props.hostory]);

    //State para iniciar sesion
    const [usuario, setUsuario] = useState({
        nombre: '',
        email:'',
        password:'',
        confirmar:''
    });

    //extraer del usuario

    const { nombre, email, password, confirmar } = usuario; 

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
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' ||confirmar.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
            return;
        }

        //Password minimo de 6 caracteres
        if(password.length < 6 ) {
            mostrarAlerta('El password debe ser de al menos 6 caracteres','alerta-error');
            return;
        }

        //Los 2 password son iguales
        if(password !== confirmar) {
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;
        }

        //Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        })
    }
    return ( 
        <div className="form-usuario">
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>)  : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="">Nombre</label>
                        <input 
                            type="text" 
                            name="nombre" 
                            className="form-control" 
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div> 

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

                    <div className="campo-form">
                        <label htmlFor="">Confirmar Password</label>
                        <input 
                            type="password" 
                            name="confirmar"
                            className="form-control" 
                            placeholder="Repite Password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div> 
                    <input type="submit" value="Registrarme" className="btn btn-primario btn-block"/>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a iniciar Sesion
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;