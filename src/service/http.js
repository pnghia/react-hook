import axios from 'axios';
import config from 'config';
import store from 'store';

export default {
  token: undefined,

  headers: {},

  setJwtToken(token = store.get('token')) {
    if (!token) {
      return false;
    }
    this.token = token;
    this.establishHeaderRequest();
    return token;
  },

  establishHeaderRequest() {
    this.headers = {
      'content-type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
  },

  get({
    path = '',
    params = {}
  }) {
    // this.setJwtToken();
    const options = {
      headers: this.headers,
      params,
      baseURL: config.baseUrl,
      withCredentials: false
    };

    return axios.get(path, options);
  },

  put({
    path = '',
    payload
  }) {
    return axios({
      baseURL: config.baseUrl,
      data: payload,
      method: 'PUT',
      url: path,
      headers: this.headers
    });
  },

  post({
    path = '',
    payload
  }) {
    // this.setJwtToken();
    return axios({
      rejectUnauthorized: false,
      baseURL: config.baseUrl,
      data: payload,
      method: 'POST',
      url: path,
      headers: this.headers
    });
  },

  postForm({
    path = '',
    payload
  }) {
    // this.setJwtToken();
    return axios({
      baseURL: config.baseUrl,
      data: payload,
      method: 'POST',
      url: path,
      headers: {
        ...this.headers,
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};