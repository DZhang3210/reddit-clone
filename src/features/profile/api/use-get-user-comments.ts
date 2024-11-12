import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetUserComments = () => {
  const data = useQuery(api.profile.getUserComments);
  const isLoading = data === undefined;

  return { data, isLoading };
};
