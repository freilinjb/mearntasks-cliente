import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

import ProyectoState from './context/proyectos/ProyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';

function App() {

  // console.log(process.env.REACT_APP_BACKEND_URL);
  
  //Revisar si tenemos un token
  const token = localStorage.getItem('token');
  if(token) {
    tokenAuth(token);
  }

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            {/* para que los diferentes props y las diferentes funciones se pasen en todo el state */}
            <Router>
              {/* Todo lo que este por fuera es lo que se va a ver en toda la pagina */}
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
                <RutaPrivada exact path="/proyectos" component={Proyectos}/>
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
 