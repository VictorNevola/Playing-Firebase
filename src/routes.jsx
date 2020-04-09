import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DbCrud from '../src/components/DbCrud';
import Home from '../src/components/Home';
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import NotFound from '../src/components/NotFound';
import { PrivateRoute } from '../src/PrivateRoute/PrivateRoute';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/crud" component={DbCrud} />
                <Route exact path="/auth" component={Register} />
                <Route exact path="/sing-up" component={Login} />
                <Route exact path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;