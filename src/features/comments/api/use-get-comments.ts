import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

// export type GetThreadsReturnType = (typeof api.threads.get._returnType)["page"];
interface GetCommentsByPostIdProps {
  postId: Id<"posts">;
}
export const useGetCommentsByPostId = ({
  postId,
}: GetCommentsByPostIdProps) => {
  const data = useQuery(api.comments.getCommentsByPostId, { postId });
  const isLoading = data === undefined;

  return { data, isLoading };
};
