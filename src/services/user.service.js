import axios from 'axios';
import { getLocalUserInfo } from '../helper/authenticate';
import config from '../config.js';

const userInfo = getLocalUserInfo();

const headers = {
    'Content-Type': 'application/json',
    'x-access-token': userInfo ? userInfo.accessToken : ''
};

class UserService {
    constructor() {
        this.url = `${config.apiServer}/users`;
    }

    getAll() {
        return axios.get(this.url, { headers: headers });
    }

    getById(id) {
        return axios.get(`${this.url}/${id}`, { headers: headers });
    }

    update(id, newData) {
        return axios.put(`${this.url}/${id}`, newData, { headers: headers });
    }

    delete(id) {
        return axios.delete(`${this.url}/${id}`, { headers: headers });
    }

    create(data) {
        return axios.post(this.url, data, { headers: headers });
    }
}

export default new UserService();