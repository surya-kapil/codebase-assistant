import { addRepository } from "@/apis/repoApi";
import { QUERY_KEYS } from "@/constants";
import queryClient from "@/utils/queryClient";
import { useMutation } from "@tanstack/react-query";

export const useAddRepository = () => {
  return useMutation({
    mutationFn: addRepository,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FETCH_REPOSITORIES],
      });
    },
  });
};
