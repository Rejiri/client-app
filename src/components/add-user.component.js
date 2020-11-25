import React from 'react';
import UserService from '../services/user.service.js';

class AddUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            fullName: '',
            email: '',
            phone: '',
            username: '',
            password: ''
        }

        this.onSave = this.onSave.bind(this);
        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onSave(event) {
        let user = {
            fullName: this.state.fullName,
            email: this.state.email,
            phone: this.state.phone,
            username: this.state.username,
            password: this.state.password
        };

        if (this.state.id == '-1')
            UserService.create(user)
            .then(() => {
                this.props.history.push('/users');
            })
            .catch((error) => console.log(error));
        else
            UserService.update(this.state.id, user)
            .then(() => {
                this.props.history.push('/users');
            })
            .catch((error) => console.log(error));
    }

    componentDidMount() {
        if (this.state.id == '-1')
            return;

        UserService.getById(this.state.id)
            .then(res => {
                this.setState({
                    id: res.data._id,
                    fullName: res.data.fullName,
                    email: res.data.email,
                    phone: res.data.phone,
                    username: res.data.username
                });
            })
            .catch(error => console.log(error.message));
    }

    onChangeFullName(event) {
        this.setState({
            fullName: event.target.value
        });
    }

    onChangeEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    onChangePhone(event) {
        this.setState({
            phone: event.target.value
        });
    }

    onChangeUserName(event) {
        this.setState({
            username: event.target.value
        });
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    render() {
        return (
            <div className="container card">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h2 className="text-center">Add/Update User</h2>
                        <br />
                        <div>
                        	<div className="form-group">
				              <label htmlFor="fullName">Full Name</label>
				              <input type="text" name="fullName" id="fullName" className="form-control" value={this.state.fullName} onChange={this.onChangeFullName} required />
				            </div>
				            <div className="form-group">
				              <label htmlFor="email">Email</label>
				              <input type="text" name="email" id="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} required />
				            </div>
				            <div className="form-group">
				              <label htmlFor="phone">Phone</label>
				              <input type="text" name="phone" id="phone" className="form-control" value={this.state.phone} onChange={this.onChangePhone} required />
				            </div>
				            <div className="form-group">
				              <label htmlFor="username">User name</label>
				              <input type="text" name="username" id="username" className="form-control" value={this.state.username} onChange={this.onChangeUserName} required />
				            </div>
                            {this.state.id == "-1" && (
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} required />
                                </div>
                            )}
                            <div className="text-center">
				                <button className="btn btn-success" onClick={this.onSave} >Save</button>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

export default AddUser;