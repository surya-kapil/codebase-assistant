import { login } from "@/apis/authApi";
import useAuthStore from "@/stores/useAuthStore";
import displayToastr from "@/utils/displayToastr";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const useLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ username, email, password }) =>
      login({ username, email, password }),

    onSuccess: () => {
      displayToastr({ isSuccess: true, message: t("login.success") });
      navigate("/dashboard");
      useAuthStore.getState().login();
    },

    onError: () => {
      displayToastr({ isSuccess: false, message: t("login.failed") });
    },
  });
};

export default useLogin;
