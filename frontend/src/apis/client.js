import axios from "axios";

const initializeAxios = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL + "/api/v1";
};

export default initializeAxios;
