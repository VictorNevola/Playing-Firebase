import React, { Component } from 'react'
import firebase from './fireConnection';
import Routes from './routes';
export default class App extends Component {

  state = {
    email: '',
    senha: '',
  }


  cadastrar = (e) => {

    //Cadastrando um usuario
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
      .then((succes) => {
        alert('cadastrado com sucesso');
      })
      .catch((err) => {
        if (err.code === 'auth/invalid-email') {
          alert('Email Invalido');
        };
        if (err.code === 'auth/weak-password') {
          alert('Senha Fraca');
        } else {
          alert(err.code)
        }
      });


    e.preventDefault();
  }



  render() {
    return (
      <div>
        <Routes />
      </div>
    )
  }
}
