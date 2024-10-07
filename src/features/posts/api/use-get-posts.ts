import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export type GetThreadsReturnType = (typeof api.posts.get._returnType)["page"];

interface UseGetPostsProps {
  name?: string;
  threadId?: Id<"threads">;
}

const BATCH_SIZE = 5;

export const useGetPosts = ({ name, threadId }: UseGetPostsProps) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.posts.get,
    { name, threadId },
    { initialNumItems: BATCH_SIZE }
  );

  return {
    results,
    status,
    loadMore: () => loadMore(BATCH_SIZE),
  };
};
