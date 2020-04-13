import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Solo para la api de notes, no es global
// const serverAddress = 'http://localhost:4000/api/notes/';

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/users/');
        this.setState({users: res.data.map(user => user.username)});
        this.setState({userSelected: this.state.users[0]});
        if(this.props.match.params.id) {
            let id = this.props.match.params.id;
            const res = await axios.get(`http://localhost:4000/api/notes/${id}`);
            const { title, content, date, author } = res.data;
            this.setState({
                title,
                content,
                date: new Date(date),
                userSelected: author,
                editing: true, 
                _id: id
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { title, content, date, userSelected } = this.state;
        if(this.state.editing) {
            const updatedNote = {
                title,
                content,
                author: userSelected,
                date
            };
            await axios.put(`http://localhost:4000/api/notes/${this.state._id}`, updatedNote);
        } else {
            const newNote = { title, content, date, author: userSelected };
            await axios.post('http://localhost:4000/api/notes', newNote);
        }
        window.location.href = '/';
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }); 
    }

    onChangeDate = (date) => {
        this.setState({date});
    }

    render() {
        const { title, content } = this.state;
        const validForm = title.length > 0 && content.length > 0;
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create Note</h4>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <div className="form-group">
                                <select name="userSelected" className="form-control" onChange={this.onInputChange} value={this.state.userSelected}>
                                    {
                                        this.state.users.map(user => (
                                            <option
                                                key={user}
                                                value={user}
                                            >
                                                {user}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="title"
                                    className="form-control"
                                    placeholder="title"
                                    value={ this.state.title }
                                    onChange={this.onInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="content"
                                    className="form-control"
                                    placeholder="content"
                                    value={ this.state.content }
                                    onChange={this.onInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <DatePicker className="form-control"
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                dateFormat="dd-MM-yyyy "
                            />
                        </div>
                        <button
                            type="submit" 
                            className="btn btn-primary"
                            disabled={ !validForm }
                        >Guardar</button>
                    </form>
                </div>
            </div>
        )
    }
}
