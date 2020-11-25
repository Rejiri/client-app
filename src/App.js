import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header.component';
import Home from './components/home.component';
import SignIn from './components/sign-in.component';
import SignUp from './components/sign-up.component';
import ProductsList from './components/products-list.component';
import AddProduct from './components/add-product.component';
import UsersList from './components/users-list.component';
import AddUser from './components/add-user.component';

export default class App extends React.Component {
    render() {
        return (
            <div>
              <BrowserRouter>
              <Header />
                <br />
                <div className="container">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/products/:id" component={AddProduct} />
                    <Route path="/products" component={ProductsList} />
                    <Route path="/users/:id" component={AddUser} />
                    <Route path="/users" component={UsersList} />
                  </Switch>
                </div>
              </BrowserRouter>
            </div>
        );
    }
}