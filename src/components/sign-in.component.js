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

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            info: ""
        };

        this.onUsername = this.onUsername.bind(this);
        this.onPassword = this.onPassword.bind(this);
        this.onSignIn = this.onSignIn.bind(this);

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

    onSignIn(event) {
        event.preventDefault();

        this.form.validateAll();

        if (this.checkButton.context._errors.length == 0) {
            AccountService.signIn(this.state.username, this.state.password)
                .then(() => {
                    this.props.history.push("/");
                    window.location.reload();
                })
                .catch(error => {
                    this.setState({ info: error.message });
                });
        }
    }

    render() {
        return (
            <div className="sign-in col-md-12">
              <div className="card card-container">
                <h3 className="text-center">Sign In</h3>
                <br/>
                <Form ref={element => { this.form = element; }} onSubmit={this.onSignIn}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input type="text" className="form-control" name="username" value={this.state.username} onChange={this.onUsername} validations={[requiredField]}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onPassword} validations={[requiredField]}/>
                  </div>
                  <div className="form-group text-center">
                    <button className="btn btn-info">Sign in</button>
                  </div>

                  {this.state.info && (
                    <div className="form-group">
                      <div className="alert alert-info" role="alert">
                        {this.state.info}
                      </div>
                    </div>
                  )}
                  <CheckButton ref={element => { this.checkButton = element; }} style={{ display: "none" }}/>
                </Form>
              </div>
            </div>
        );
    }
}