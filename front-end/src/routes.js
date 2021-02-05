import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/login/login";
import CriarAlunos from "./pages/alunos/criarAlunos";
import ModificarAlunos from "./pages/alunos/modificarAlunos";
import VisualizarAlunos from "./pages/alunos/visualizarAlunos";

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/criarAlunos" component={CriarAlunos} />
          <Route path="/modificarAlunos" component={ModificarAlunos} />
          <Route path="/visualizarAlunos" component={VisualizarAlunos} />

          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
