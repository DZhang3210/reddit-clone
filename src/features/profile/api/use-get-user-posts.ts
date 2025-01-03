import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const BATCH_SIZE = 5;

export const useGetUserPosts = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.profile.getUserPosts,
    {},
    { initialNumItems: BATCH_SIZE }
  );

  return {
    results,
    status,
    loadMore: () => loadMore(BATCH_SIZE),
  };
};
