import axios, { AxiosInstance } from 'axios';

// Create an Axios instance for the Cat API
const api: AxiosInstance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/images/search',
  headers: {
    'x-api-key': process.env.CAT_API_KEY,
  },
  timeout: 1000,
});

export default api;
