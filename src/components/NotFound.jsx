import React, { Component } from 'react';
import Header from './Header';

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <Header way={
                    [
                        { way: '/', nameWay: "Home" },
                        { way: 'auth', nameWay: 'Cadastrar-se' },
                        { way: 'sing-up', nameWay: 'Login' },
                    ]
                } />
                <h1>Pagina não encontrada, utilize os links acima</h1>
            </div>
        )
    }
}
