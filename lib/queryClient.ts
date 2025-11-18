import { QueryClient } from "@tanstack/react-query";

export const getQueryClient = (() => {
  let client: QueryClient | null = null;

  return () => {
    if (!client) {
      client = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            retry: 1,
            refetchOnWindowFocus: false
          }
        }
      });
    }

    return client;
  };
})();

