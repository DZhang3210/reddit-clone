import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

// export type GetThreadsReturnType = (typeof api.threads.get._returnType)["page"];

export const useGetUserSaved = () => {
  const data = useQuery(api.profile.getUserSaved);
  const isLoading = data === undefined;

  return { data, isLoading };
};
