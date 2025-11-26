import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // nanti sesuaikan dengan backend
});

export default api;
