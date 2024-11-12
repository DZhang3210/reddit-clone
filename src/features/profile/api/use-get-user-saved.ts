import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const BATCH_SIZE = 5;

export const useGetUserSaved = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.profile.getUserSaved,
    {},
    { initialNumItems: BATCH_SIZE }
  );

  return {
    results,
    status,
    loadMore: () => loadMore(BATCH_SIZE),
  };
};
