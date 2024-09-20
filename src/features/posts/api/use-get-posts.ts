import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export type GetThreadsReturnType = (typeof api.posts.get._returnType)["page"];

interface UseGetPostsProps {
  name?: string;
}

const BATCH_SIZE = 5;

export const useGetPosts = ({ name }: UseGetPostsProps) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.posts.get,
    { name },
    { initialNumItems: BATCH_SIZE }
  );

  return {
    results,
    status,
    loadMore: () => loadMore(BATCH_SIZE),
  };
};
