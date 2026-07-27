import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { fetchHealthCheck } from "@/apis/healthApi";

export const useHealthCheck = ownerName =>
  useQuery({
    queryKey: [QUERY_KEYS.TEST, ownerName],
    queryFn: () => fetchHealthCheck({owner: ownerName}),
    enabled: !!ownerName,
  });
