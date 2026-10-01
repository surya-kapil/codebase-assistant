import { logout } from "@/apis/authApi";
import { QUERY_KEYS } from "@/constants";
import queryClient from "@/utils/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.removeQueries({
        queryKey: [QUERY_KEYS.AUTH],
      });
    },
  });
};
