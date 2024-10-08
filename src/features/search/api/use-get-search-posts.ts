import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export type GetThreadsReturnType = (typeof api.posts.get._returnType)["page"];

interface UseGetSearchPostsProps {
  query: string;
}

const BATCH_SIZE = 5;

export const useGetSearchPosts = ({ query }: UseGetSearchPostsProps) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.search.searchPosts,
    { query },
    { initialNumItems: BATCH_SIZE }
  );

  return {
    results,
    status,
    loadMore: () => loadMore(BATCH_SIZE),
  };
};
