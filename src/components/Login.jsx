import React, { Component } from 'react';
import firebase from '../fireConnection';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        message: '',
        singIn: false,
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.messageAuth('Usuario Logado com sucesso');
                this.setState({ singIn: true });
            }
        });
    }

    handlerInputs = (e) => {
        let state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    logar = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((succes) => {
                this.messageAuth('Logado com sucesso');
            })
            .catch((err) => {
                if (err.code === 'auth/wrong-password') {
                    this.messageAuth('Senha Incorreta');
                } else if (err.code === 'auth/user-not-found') {
                    this.messageAuth('Usuario Não Cadastrado');
                }
                else {
                    alert(err.code)
                }
            });
    };

    logout = (e) => {
        e.preventDefault();
        firebase.auth().signOut()
            .then((succes) => {
                this.messageAuth('Usuario Deslogado com Sucesso');
                this.setState({ singIn: false })
            })
    }

    messageAuth = (message) => {
        this.setState({ message: message });
    }

    render() {
        return (
            <div>
                <Header way={
                    [
                        { way: '/', nameWay: "Home" },
                        { way: 'auth', nameWay: 'Cadastrar-se' }
                    ]
                } />
                <h1>Tela de Login de usuario</h1>
                <form onSubmit={this.logar}>
                    <label>Email:</label>
                    <input type="Email" name="email" placeholder="Email" onChange={this.handlerInputs} value={this.state.email} />
                    <br />
                    <label>Senha:</label>
                    <input type="password" name='password' placeholder="Email" onChange={this.handlerInputs} value={this.state.password} />
                    <br />
                    <button type='submit'>Logar</button>
                </form>
                {
                    this.state.message !== '' && <h2>{this.state.message}</h2>
                }
                {
                    this.state.singIn === true && <button onClick={this.logout}>Sair</button>
                }
                {
                    this.state.singIn === true && <Link to='/crud'> Banco de dados CRUD</Link>
                }

            </div>
        )
    }
}
