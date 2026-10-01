import { register } from "@/apis/authApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ username, email, password }) =>
      register({ username, email, password }),
    onSuccess: () => {
      navigate("/login");
    },
  });
};
