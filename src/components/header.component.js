import React from 'react';
import { getLocalUserInfo } from '../helper/authenticate';

import AccountService from "../services/account.service";

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        const userInfo = getLocalUserInfo();
        if (userInfo) {
            this.setState({
                currentUser: userInfo
            });
        }
    }

    onSignOut() {
        AccountService.signOut();
    }

    render() {
        return (
            <nav className="navbar navbar-expand bg-nav">
              <div className="navbar-nav">
                <li className="nav-item">
                  <a href="/" className="nav-link">Home | </a>
                </li>

              {this.state.currentUser
                ? (
                    <div className="navbar-nav">
                      <li className="nav-item">
                        <a href="/products" className="nav-link">Products</a>
                      </li>
                      <li className="nav-item">
                        <a href="/users" className="nav-link">Users</a>
                      </li>
                      <li className="nav-item">
                        <a href="/" className="nav-link" onClick={this.onSignOut} style={{ marginLeft: "50px" }}>Sign out ({this.state.currentUser.fullName})</a>
                      </li>
                    </div>
                )
                : (
                    <div className="navbar-nav">
                      <li className="nav-item">
                        <a href="/signin" className="nav-link">Sign in</a>
                      </li>
                      <li className="nav-item">
                        <a href="/signup" className="nav-link">Sign up</a>
                      </li>
                    </div>
                )}
                </div>
            </nav>
        );
    }
}
