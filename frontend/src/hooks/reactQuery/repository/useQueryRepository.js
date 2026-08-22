import { queryRepository } from "@/apis/repoApi";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

const useQueryRepository = ({ query, repositoryId }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.QUERY_REPOSITORY, query, repositoryId],
    queryFn: () => queryRepository({ query, repositoryId }),
    staleTime: 3_600_000,
    enabled: false,
  });
};

export default useQueryRepository;
