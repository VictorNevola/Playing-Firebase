import React from 'react';
import firebase from '../fireConnection';
import { Redirect, Route } from 'react-router-dom';

let autenticado = ''

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        autenticado = true;
    } else {
        autenticado = false;
    }
});

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (<Route {...rest} render={props => (
        autenticado ? (<Component {...props} />) : (<Redirect to={{ pathname: "/auth", state: { from: props.location } }} />)
    )} />)
}
