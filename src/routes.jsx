import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DbCrud from '../src/components/DbCrud';
import Home from '../src/components/Home';
import Register from '../src/components/Register'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/"     component={Home} />
                <Route exact path="/crud" component={DbCrud} />
                <Route exact path="/auth" component={Register} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;