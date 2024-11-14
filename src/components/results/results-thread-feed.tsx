import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import ThreadResultPage from "./result-thread-feed";

export type Thread = Doc<"threads"> & {
  isFollowing: boolean;
  logoImage: string | null;
  bannerImage: string | null;
};

interface ThreadResultsProps {
  results: Thread[];
}

const ThreadResultsPage = ({ results }: ThreadResultsProps) => {
  return (
    <div className="flex flex-col gap-2">
      {results.map((result) => (
        <ThreadResultPage key={result._id} thread={result} />
      ))}
    </div>
  );
};

export default ThreadResultsPage;
