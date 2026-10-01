import i18n from "@/common/i18n";
import { CODE_MESSAGES } from "@/constants";
import displayToastr from "@/utils/displayToastr";
import axios from "axios";

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      console.log("Response...");
      console.log(response.data);
      const code = response?.data?.codeMessage;

      if (code?.trim()) {
        displayToastr({
          isSuccess: true,
          message: i18n.t(CODE_MESSAGES[code]),
        });
      }
      return response.data;
    },

    error => {
      const code = error.response?.data?.codeMessage;

      console.log("Error...");
      console.log(error.response);

      if (error.response?.status === 401 && code !== "INCORRECT_PASSWORD")
        window.location.href = "/login";
      displayToastr({
        isSuccess: false,
        message: code ? i18n.t(CODE_MESSAGES[code]) : i18n.t("errors.generic"),
      });
      return Promise.reject(error);
    }
  );
};

const initializeAxios = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL + "/api/v1";
  axios.defaults.withCredentials = true;
  responseInterceptors();
};

export default initializeAxios;
