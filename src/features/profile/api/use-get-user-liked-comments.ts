import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
// export type GetThreadsReturnType = (typeof api.threads.get._returnType)["page"];

export const useGetUserLikedComments = () => {
  const data = useQuery(api.profile.getUserLikedComments);
  const isLoading = data === undefined;

  return { data, isLoading };
};
