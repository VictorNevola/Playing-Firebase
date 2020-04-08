import React, { Component } from 'react'
import Header from '../components/Header';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header way={
                    [
                        { way: 'auth', nameWay: "Cadastra-se" },
                        { way: 'sing-up', nameWay: 'Login' }
                    ]
                } />
                <h2>Este é um exemplo basico para utilização do firebase e React</h2>
                <h3>Acesse os links acima para continuar</h3>
            </div>
        )
    }
}
