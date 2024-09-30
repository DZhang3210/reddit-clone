import { Doc } from "../../convex/_generated/dataModel";

export type Comment = Doc<"comments"> & {
  author: Doc<"users">;
  replies: Comment[];
  isLiked: boolean;
};
