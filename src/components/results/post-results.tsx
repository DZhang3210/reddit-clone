import React from "react";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import ResultItem from "./post-result";
import { Loader2 } from "lucide-react";

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
  loadMore: () => void;
  canLoadMore: boolean;
  isLoadingMore: boolean;
}

const PostResults = ({
  results,
  loadMore,
  canLoadMore,
  isLoadingMore,
}: PostResultsProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {results.map((result) => (
        <>
          <ResultItem key={result._id} post={result} />
          <div className="h-1 border-t-[2px] border-gray-700" />
        </>
      ))}
      <div
        className="h-1"
        ref={(el) => {
          if (el) {
            const observer = new IntersectionObserver(
              ([entry]) => {
                if (entry.isIntersecting && canLoadMore) {
                  loadMore();
                }
              },
              { threshold: 1.0 }
            );

            observer.observe(el);
            return () => observer.disconnect();
          }
        }}
      />

      {isLoadingMore && (
        <div className="text-center my-2 relative">
          <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
          <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
            <Loader2 className="size-4 animate-spin" />
          </span>
        </div>
      )}
    </div>
  );
};

export default PostResults;
