import React from 'react';
import UserService from '../services/user.service.js';

class UsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }

        this.refreshList = this.refreshList.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        UserService.getAll().then(res => {
            this.setState({ users: res.data });
        }).catch(error => console.log(error));
    }

    onAdd() {
        this.props.history.push('/users/-1');
    }

    onEdit(id) {
        this.props.history.push(`/users/${id}`);
    }

    onDelete(id) {
        UserService.delete(id)
            .then(res => {
                const list = this.state.users.filter(item => item._id != id);
                this.setState({
                    users: list
                })
            })
            .catch(error => console.log(error));
    }

    getList() {
    	return this.state.users.map(user => (
            <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.username}</td>
                <td>
                    <button className="btn btn-info" onClick={ () => this.onEdit(user._id)}>View / Update</button>
                    <button className="btn btn-danger ml-2" onClick={ () => this.onDelete(user._id)}>Delete</button>
                </td>
            </tr>
        ));
    }

    render() {
    	return (
    		<div>
                <div className="jumbotron">
                    <h3 className="text-center">Users</h3>
                </div>
                <br />
                <div className="row">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Full name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Username</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        	{ this.getList() }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                	<button className="btn btn-primary" onClick={this.onAdd}>Add User</button>
                </div>
            </div>
    		);
    }
}

export default UsersList;
