import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import ThreadResult from "./thread-result";

export type Thread = Doc<"threads"> & {
  isFollowing: boolean;
  logoImage: string | null;
  bannerImage: string | null;
};

interface ThreadResultsProps {
  results: Thread[];
}

const PostResults = ({ results }: ThreadResultsProps) => {
  return (
    <div className="flex flex-col gap-4 mx-4 pt-4">
      {results.map((result) => (
        <ThreadResult key={result._id} thread={result} />
      ))}
    </div>
  );
};

export default PostResults;
