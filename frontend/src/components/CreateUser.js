import React, { Component } from 'react'
import axios from 'axios'

// Solo para la api de users, no es global
const serverAddress = 'http://localhost:4000/api/users/';

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    }

    // Cuando el componente se haya montado
    async componentDidMount() {
        this.getUsers();
    }

    getUsers = async() => {
        const res = await axios.get(serverAddress);
        this.setState({users: res.data});
    }

    onChangeUserName = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(serverAddress, {
            username: this.state.username
        });
        this.setState({username: ''});
        this.getUsers();
    }

    deleteUser = async (id) => {
        if(window.confirm('¿Está seguro de eliminar este usuario?')) {
            await axios.delete(`${serverAddress}${id}`);
            this.getUsers();
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={this.onChangeUserName}
                                    name="username"
                                    value={this.state.username}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={!this.state.username}>Guardar</button>
                        </form>
                    </div>
               </div>
                <div className="col-md-8">
                    <div className="container">
                        <div className="card">
                            <div className="card-body">
                                <ul className="list-group">
                                    {
                                        this.state.users.map(user => (
                                            <li 
                                                className="list-group-item list-group-item-action" 
                                                key={user._id}
                                                onDoubleClick={() => this.deleteUser(user._id)}
                                            >
                                                {user.username}
                                            </li>)
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
