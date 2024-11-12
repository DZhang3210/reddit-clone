import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetAllThreads = () => {
  const data = useQuery(api.threads.getAll);
  const isLoading = data === undefined;

  return { data, isLoading };
};
