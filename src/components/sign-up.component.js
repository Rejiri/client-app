import React from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import AccountService from "../services/account.service";

const requiredField = (text) => {
    if (text.length < 1) {
        return (<p className="alert alert-info" role="alert">Required Field</p>);
    }
};

const validateUsernamePassword = text => {
    if (text.length < 4) {
        return (
            <p className="alert alert-info" role="alert">
              Username/Password should be more than 3 characters
            </p>
        );
    }
};

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.onFullName = this.onFullName.bind(this);
        this.onEmail = this.onEmail.bind(this);
        this.onPhone = this.onPhone.bind(this);
        this.onUsername = this.onUsername.bind(this);
        this.onPassword = this.onPassword.bind(this);
        this.onSignUp = this.onSignUp.bind(this);

        this.state = {
            fullName: "",
            email: "",
            phone: "",
            username: "",
            password: "",
            info: ""
        };
    }

    onFullName(event) {
        this.setState({
            fullName: event.target.value
        });
    }

    onEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    onPhone(event) {
        this.setState({
            phone: event.target.value
        });
    }

    onUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    onPassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    onSignUp(event) {
        event.preventDefault();

        this.form.validateAll();

        if (this.checkButton.context._errors.length == 0) {
            AccountService.signUp(this.state.fullName, this.state.email, this.state.phone, this.state.username, this.state.password)
                .then(res => {
                    this.setState({
                        info: res.data.message
                    });
                    this.props.history.push("/signin");
                }).catch(error => {
                    this.setState({
                        info: error.message
                    });
                });
        }
    }

    render() {
        return (
            <div className="sign-up col-md-12">
              <div className="card card-container">
                <h3 className="text-center">Sign Up</h3>
                <br/>
                <Form ref={ element => { this.form = element; }} onSubmit={this.onSignUp}>
                    <div>
                      <div className="form-group">
                        <label htmlFor="fullname">Full Name</label>
                        <Input type="text" className="form-control" name="fullname" value={this.state.fullname} onChange={this.onFullName} validations={[requiredField]}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onEmail} validations={[requiredField]}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <Input type="text" className="form-control" name="phone" value={this.state.phone} onChange={this.onPhone} validations={[requiredField]}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input type="text" className="form-control" name="username" value={this.state.username} onChange={this.onUsername} validations={[requiredField, validateUsernamePassword]}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onPassword} validations={[requiredField, validateUsernamePassword]}/>
                      </div>
                      <div className="form-group text-center">
                        <button className="btn btn-info">Sign Up</button>
                      </div>
                    </div>

                  {this.state.info && (
                    <div className="form-group">
                      <div className="alert alert-info" role="alert">{this.state.info}</div>
                    </div>
                  )}
                  <CheckButton ref={element => { this.checkButton = element; }} style={{ display: "none" }}/>
                </Form>
              </div>
            </div>
        );
    }
}