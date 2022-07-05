import axios from 'axios';

const instance = axios.create({
  // baseUrl: process.env.REACT_APP_API_URL,
  baseUrl: 'http://localhost:4444',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export default instance;
