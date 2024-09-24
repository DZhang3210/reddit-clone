import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

// export type GetThreadsReturnType = (typeof api.threads.get._returnType)["page"];
interface UseGetPostProps {
  id: Id<"posts">;
}
export const useGetPost = ({ id }: UseGetPostProps) => {
  const data = useQuery(api.posts.getById, { postId: id });
  const isLoading = data === undefined;

  return { data, isLoading };
};
