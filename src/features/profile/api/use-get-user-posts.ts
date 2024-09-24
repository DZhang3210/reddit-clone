import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

// export type GetThreadsReturnType = (typeof api.threads.get._returnType)["page"];

export const useGetUserPosts = () => {
  const data = useQuery(api.profile.getUserPosts);
  const isLoading = data === undefined;

  return { data, isLoading };
};
