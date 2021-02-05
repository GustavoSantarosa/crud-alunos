import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/login/login";
import CriarAlunos from "./pages/alunos/criarAlunos";
import ModificarAlunos from "./pages/alunos/modificarAlunos";
import VisualizarAlunos from "./pages/alunos/visualizarAlunos";
import UserContext from "./context/user";

const Routes = () => {
  const [user] = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          {user && user.Token && (
            <>
              <Route path="/criarAlunos" component={CriarAlunos} />
              <Route path="/modificarAlunos" component={ModificarAlunos} />
              <Route path="/visualizarAlunos" component={VisualizarAlunos} />
            </>
          )}
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
