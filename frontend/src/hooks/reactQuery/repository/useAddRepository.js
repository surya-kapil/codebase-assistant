import { addRepository } from "@/apis/repoApi";
import { QUERY_KEYS } from "@/constants";
import displayToastr from "@/utils/displayToastr";
import queryClient from "@/utils/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useAddRepository = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: addRepository,

    onSuccess: () => {
      displayToastr({ isSuccess: true, message: t("repository.add.success") });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FETCH_REPOSITORIES],
      });
    },

    onError: () => {
      displayToastr({ isSuccess: false, message: t("repository.add.failed") });
    },
  });
};
