import { QueryClient, QueryCache } from "@tanstack/react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 15 * 60 * 1000,
    },
  },
});

export default queryClient;
