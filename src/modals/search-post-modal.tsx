"use client";
import PostResults from "@/components/results/post-results";
import PostResultsSkeleton from "@/components/results/post-results-skeleton";
import ThreadResults, { Thread } from "@/components/results/thread-results";
import ThreadResultsSkeleton from "@/components/results/thread-results-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useGetSearchPosts } from "@/features/search/api/use-get-search-posts";
import { useGetSearchThreads } from "@/features/search/api/use-get-search-threads";
import useSearchPost from "@/hooks/search-post-hook";
import { Search, X } from "lucide-react";
import React from "react";

const ThreadModal = () => {
  const searchPost = useSearchPost();
  const { results: threads, status: threadsStatus } = useGetSearchThreads({
    query: searchPost.searchQuery || "",
  });
  const { results: posts, status: postsStatus } = useGetSearchPosts({
    query: searchPost.searchQuery || "",
  });

  console.log("THREADS", threads);
  console.log("POSTS", posts);

  return (
    <Modal isOpen={searchPost.searchQuery !== null} onClose={searchPost.setOff}>
      <div className="relative mx-4 flex items-center rounded-full">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          //   ref={inputRef}
          type="text"
          placeholder="Type to search..."
          className="pl-8 pr-4"
          value={searchPost.searchQuery || ""}
          onChange={(e) => searchPost.setSearchQuery(e.target.value)}
        />
        {searchPost.searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => searchPost.setOff()}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-4 h-[500px] overflow-y-auto border-white border-2 pt-5">
        {searchPost.searchQuery !== "" &&
          (threadsStatus !== "LoadingFirstPage" ? (
            <ThreadResults results={threads as Thread[]} />
          ) : (
            <ThreadResultsSkeleton />
          ))}
        {searchPost.searchQuery !== "" &&
          (postsStatus !== "LoadingFirstPage" ? (
            <PostResults results={posts} />
          ) : (
            <PostResultsSkeleton />
          ))}
      </div>
      <Button
        className="text-sm text-center flex justify-center mx-4"
        onClick={searchPost.setOff}
      >
        Cancel
      </Button>
    </Modal>
  );
};

export default ThreadModal;
