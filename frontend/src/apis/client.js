import axios from "axios";

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error.response?.data)
  );
};

const initializeAxios = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL + "/api/v1";
  responseInterceptors();
};

export default initializeAxios;
