import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export type UseGetThreadsReturnType =
  (typeof api.threads.get._returnType)["page"];

interface UseGetThreadsProps {
  name?: string;
}

const BATCH_SIZE = 20;

export const useGetThreads = ({ name }: UseGetThreadsProps) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.threads.get,
    { name },
    { initialNumItems: BATCH_SIZE }
  );

  return {
    results,
    status,
    loadMore: () => loadMore(BATCH_SIZE),
  };
};
