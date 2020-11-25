import axios from 'axios';
import { getAccessToken } from '../helper/authenticate';
import config from '../config.js';

class AccountService {
    constructor() {
        this.url = `${config.apiServer}/accounts`;
    }

    signUp(fullName, email, phone, username, password) {
        return axios.post(`${this.url}/signup`, {
            fullName: fullName,
            email: email,
            phone: phone,
            username: username,
            password: password
        });
    }

    signIn(username, password) {
        return axios.post(`${this.url}/signin`, {
                username: username,
                password: password
            })
            .then(res => {
                if (res.data.accessToken) {
                    localStorage.setItem("data", JSON.stringify(res.data));
                }
                return res.data;
            });
    }

    signOut() {
        localStorage.removeItem("data");
    }
}

export default new AccountService();