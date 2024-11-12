import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetUserThreads = () => {
  const data = useQuery(api.profile.getUserThreads);
  const isLoading = data === undefined;

  return { data, isLoading };
};
