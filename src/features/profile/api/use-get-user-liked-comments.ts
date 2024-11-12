import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetUserLikedComments = () => {
  const data = useQuery(api.profile.getUserLikedComments);
  const isLoading = data === undefined;

  return { data, isLoading };
};
