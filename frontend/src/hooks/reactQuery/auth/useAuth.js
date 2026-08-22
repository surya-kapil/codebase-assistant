import { checkMe } from "@/apis/authApi";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: checkMe,
    staleTime: 0,
    retry: false,
  });
};

export default useAuth;
