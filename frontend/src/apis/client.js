import axios from "axios";

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => response.data,

    error => Promise.reject(error)
  );
};

const initializeAxios = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL + "/api/v1";
  axios.defaults.withCredentials = true;
  responseInterceptors();
};

export default initializeAxios;
