import { register } from "@/apis/authApi";
import displayToastr from "@/utils/displayToastr";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const useRegister = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: ({ username, email, password }) =>
      register({ username, email, password }),
    onSuccess: () => {
      navigate("/login");
      displayToastr({ isSuccess: true, message: t("registration.success") });
    },
    onError: () => {
      displayToastr({ isSuccess: false, message: t("registration.failed") });
    },
  });
};
