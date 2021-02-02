import React from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Login from './pages/login';

const Routes = () => (
<BrowserRouter>
     <Switch>
    <Route path="/login" component={Login}></Route>

    <Redirect to="/login" />
    </Switch>
    </BrowserRouter>

    )

export default Routes;    