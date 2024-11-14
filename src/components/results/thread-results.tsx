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
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
}

const ThreadResults = ({ results, setSearchQuery }: ThreadResultsProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {results.map((result) => (
        <ThreadResult
          key={result._id}
          thread={result}
          setSearchQuery={setSearchQuery}
        />
      ))}
    </div>
  );
};

export default ThreadResults;
