import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

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
