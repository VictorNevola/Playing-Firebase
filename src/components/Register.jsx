import React, { Component } from 'react';
import firebase from '../fireConnection';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

export default class Register extends Component {
    state = {
        nome: '',
        email: '',
        password: '',
        message: '',
        idade: ''
    };

    handlerInputs = (e) => {
        let state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    register = (e) => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((succes) => {
                firebase.database().ref('usuarios').child(succes.user.uid).set({
                    nome: this.state.nome,
                    email: this.state.email,
                    password: this.state.password,
                    idade: this.state.idade
                });
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
    };


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
                    <label>Nome:</label>
                    <input type="text" name="nome" placeholder="Nome" onChange={this.handlerInputs} value={this.state.nome} />
                    <br />
                    <label>Idade:</label>
                    <input type="text" name="idade" placeholder="Nome" onChange={this.handlerInputs} value={this.state.idade} />
                    <br />
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
                {
                    this.state.message !== '' && <Link to='/sing-up'> Login</Link>
                }
            </div>
        );
    };
};