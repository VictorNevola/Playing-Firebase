import React, { Component } from 'react';
import firebase from '../fireConnection';
import Header from '../components/Header';

export default class DbCrud extends Component {
    state = {
        name: '',
        age: '',
        list: [],
        button: 'Cadastrar',
        key: ''
    }

    componentDidMount() {
        let usuariosDB = firebase.database().ref('usuarios');

        // Pega todos os valores
        usuariosDB.on('value', (snapshot) => {
            let state = this.state;
            state.list = [];

            snapshot.forEach((childItem) => {
                state.list.push({
                    key: childItem.key,
                    nome: childItem.val().nome,
                    idade: childItem.val().idade,
                    email: childItem.val().email,
                })
            })
            this.setState(state);
        })
    }

    handlerInputs = (e) => {
        let state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    cadastrar = (e) => {
        e.preventDefault();
        let usuariosDB = firebase.database().ref('usuarios');
        switch (e.target.name) {

            case 'Cadastrar':
                // Cria um id aleatorio
                let chaveUsuario = usuariosDB.push().key;

                // cria uma nova propiedade
                usuariosDB.child(chaveUsuario).set({
                    nome: this.state.name,
                    idade: this.state.age
                });
                break;

            case 'Salvar':
                usuariosDB.child(e.target.value).set({
                    nome: this.state.name,
                    idade: this.state.age,
                })
                    .then((succes) => {
                        this.setState({
                            button: 'Cadastrar',
                            name: '',
                            age: '',
                        })
                    });

                break;
            default:
                break;
        }
    };

    remover = (e) => {
        e.preventDefault();
        let usuariosDB = firebase.database().ref('usuarios');
        usuariosDB.child(e.target.value).remove();
    };

    update = (e) => {
        e.preventDefault();
        let usuariosDB = firebase.database().ref('usuarios');

        usuariosDB.child(e.target.value).once('value', (snapshot) => {
            this.setState({
                name: snapshot.val().nome,
                age: snapshot.val().idade,
                button: 'Salvar',
                key: snapshot.key,
            });
            document.querySelector("#focus").focus();
        });
    };

    logout = (e) => {
        firebase.auth().signOut()
            .then((succes) => {
                this.props.history.push("/");
            })
    }

    render() {
        return (
            <div>
                <Header way={
                    [
                        { way: '/', nameWay: "Home" },
                    ]
                } />
                <button onClick={this.logout}>Sair</button>
                <div>
                    <h2>Cria um novo usuario no banco</h2>
                    <form >
                        <label> Nome: </label>
                        <input id='focus' type="text" value={this.state.name} name='name' onChange={this.handlerInputs} required />

                        <label> idade: </label>
                        <input type="text" value={this.state.age} name='age' onChange={this.handlerInputs} required />

                        <button type="submit" value={this.state.key} name={this.state.button} onClick={this.cadastrar}>{this.state.button}</button>
                    </form>
                </div>
                <div>
                    <h2> Todos usuarios cadastrados no Firebase</h2>
                    <ul>
                        {
                            this.state.list.length === 0 ? <h2>Carregando</h2> :
                                this.state.list.map((user) => {
                                    return (
                                        <li key={user.key}>
                                            <h3>Nome: {user.nome} </h3>
                                            <h3>Idade: {user.idade} </h3>
                                            <h3>Email: {user.email} </h3>
                                            <button onClick={this.update} value={user.key}>Editar</button>
                                            <button onClick={this.remover} value={user.key}>Remover</button>
                                        </li>
                                    )
                                })}
                    </ul>
                </div>
            </div>
        )
    }
}
