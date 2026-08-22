import i18n from "@/common/i18n";
import useAuthStore from "@/stores/useAuthStore";
import displayToastr from "@/utils/displayToastr";
import axios from "axios";

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => response.data,

    error => {
      if (error.response?.status === 401) {
        displayToastr({
          isSuccess: false,
          message: i18n.t("authentication.sessionExpired"),
          customId: "session-expired",
        });

        useAuthStore.getState().logout();
      }

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
