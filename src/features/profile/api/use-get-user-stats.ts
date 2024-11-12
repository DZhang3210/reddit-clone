import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetUserStats = () => {
  const data = useQuery(api.profile.getUserStats);
  const isLoading = data === undefined;

  return { data, isLoading };
};
