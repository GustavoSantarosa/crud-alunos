import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/login/login";
import PreviewAlunos from "./pages/tableAlunos/previewAluno";
import UpdateAlunos from "./pages/tableAlunos/updateAluno";
import CreateAlunos from "./pages/tableAlunos/createAluno";



const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
           <Route path="/login" component={Login} />

           <Route path="/previewAlunos" component={PreviewAlunos} />
           <Route path="/updateAlunos" component={UpdateAlunos} />
           <Route path="/createAlunos" component={CreateAlunos} />
 

          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
