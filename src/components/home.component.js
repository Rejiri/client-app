import React from 'react';
import { getLocalUserInfo } from '../helper/authenticate';

export default class Home extends React.Component {
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

    render() {
        return (
            <div className="container home">
              <div className="jumbotron">
                <h3>Welcome { this.state.currentUser && this.state.currentUser.fullName }</h3>
              </div>
            </div>
        );
    }
}
