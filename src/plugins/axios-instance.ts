import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  // Aquí puedes añadir más configuraciones como headers por defecto
});

export default axiosInstance;