import { fetchRepositories } from "@/apis/repoApi";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";

const useFetchRepositories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FETCH_REPOSITORIES],
    queryFn: fetchRepositories,
    staleTime: 3_600_000,
  });
};

export default useFetchRepositories;
