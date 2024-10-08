import React from "react";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import ResultItem from "./post-result";

export type Post = {
  image: string | null;
  _id: Id<"posts">;
  _creationTime: number;
  title: string;
  createdAt: number;
  updatedAt: number;
  content: string;
  imageTitle: string;
  likes: number;
  user: Doc<"users"> | null;
  thread: (Doc<"threads"> & { image: string | null }) | null;
  liked: boolean | undefined;
  saved: boolean | undefined;
  numComments: number;
  firstComment?: Doc<"comments"> | null;
};

interface PostResultsProps {
  results: Post[];
}

const PostResults = ({ results }: PostResultsProps) => {
  return (
    <div className="flex flex-col gap-4 mx-4 pt-4">
      {results.map((result) => (
        <ResultItem key={result._id} post={result} />
      ))}
    </div>
  );
};

export default PostResults;
