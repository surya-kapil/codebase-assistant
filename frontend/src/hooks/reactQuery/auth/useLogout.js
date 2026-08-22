import { logout } from "@/apis/authApi";
import { QUERY_KEYS } from "@/constants";
import displayToastr from "@/utils/displayToastr";
import queryClient from "@/utils/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      displayToastr({ isSuccess: true, message: t("logout.successful") });
      navigate("/login", { replace: true });
      queryClient.removeQueries({
        queryKey: [QUERY_KEYS.AUTH],
      });
    },
  });
};
