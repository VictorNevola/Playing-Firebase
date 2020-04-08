import React, { Component } from 'react';
import firebase from '../fireConnection';
import Header from '../components/Header';

export default class Register extends Component {
    state = {
        email: '',
        password: '',
        message: ''
    }


    handlerInputs = (e) => {
        let state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    register = (e) => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((succes) => {
                this.messageAuth('Cadastrado com sucesso');
            })
            .catch((err) => {
                if (err.code === 'auth/invalid-email') {
                    this.messageAuth('Email Invalido');
                }
                else if (err.code === 'auth/weak-password') {
                    this.messageAuth('Senha Fraca');
                }
                else if (err.code === 'auth/email-already-in-use') {
                    this.messageAuth('Email Já cadastrado');
                }
                else {
                    alert(err.code)
                }
            });
    };

    messageAuth = (message) => {
        this.setState({ message: message });
        setTimeout(() => {
            this.setState({ message: '' })
        }, 15000);
    }

    render() {
        return (
            <div>
                <Header way={
                    [
                        { way: '/', nameWay: "Home" },
                        { way: 'sing-up', nameWay: 'Login' }
                    ]
                } />
                <h1>Tela de Cadastro de usuario</h1>
                <form onSubmit={this.register}>
                    <label>Email:</label>
                    <input type="Email" name="email" placeholder="Email" onChange={this.handlerInputs} value={this.state.email} />
                    <br />
                    <label>Senha:</label>
                    <input type="password" name='password' placeholder="Email" onChange={this.handlerInputs} value={this.state.password} />
                    <br />
                    <button type='submit'>Cadastrar</button>
                </form>
                {
                    this.state.message !== '' && <h2>{this.state.message}</h2>
                }
            </div>
        )
    }
}
