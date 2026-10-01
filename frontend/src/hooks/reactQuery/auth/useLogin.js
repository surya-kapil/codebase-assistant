import { login } from "@/apis/authApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ username, email, password }) =>
      login({ username, email, password }),

    onSuccess: () => {
      navigate("/dashboard");
    },
  });
};

export default useLogin;
