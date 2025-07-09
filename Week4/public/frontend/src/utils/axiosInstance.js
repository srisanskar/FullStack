import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/', // Django backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // If using session/cookie login
});

export default axiosInstance;
