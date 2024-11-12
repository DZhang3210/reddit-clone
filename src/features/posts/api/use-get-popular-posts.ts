import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const BATCH_SIZE = 5;

export const useGetPopularPosts = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.posts.getPopularPosts,
    {},
    { initialNumItems: BATCH_SIZE }
  );

  return {
    results,
    status,
    loadMore: () => loadMore(BATCH_SIZE),
  };
};
