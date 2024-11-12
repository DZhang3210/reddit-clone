import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface UseGetSearchThreadsProps {
  query: string;
}

const BATCH_SIZE = 3;

export const useGetSearchThreads = ({ query }: UseGetSearchThreadsProps) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.search.searchThreads,
    { query },
    { initialNumItems: BATCH_SIZE }
  );

  return {
    results,
    status,
    loadMore: () => loadMore(BATCH_SIZE),
  };
};
