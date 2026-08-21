import { login } from "@/apis/authApi";
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
      (displayToastr({ isSuccess: true, message: t("login.success") }),
        navigate("/dashboard"));
    },

    onError: () => {
      displayToastr({ isSuccess: false, message: t("login.failure") });
    },
  });
};

export default useLogin;
