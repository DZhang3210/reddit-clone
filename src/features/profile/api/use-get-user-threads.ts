import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export type UseGetUserThreadsReturnType = typeof api.profile.getUserThreads;

export const useGetUserThreads = () => {
  const data = useQuery(api.profile.getUserThreads);
  const isLoading = data === undefined;

  return { data, isLoading };
};
