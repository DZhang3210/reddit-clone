"use client";
import PostResults from "@/components/results/post-results";
import ThreadResults, { Thread } from "@/components/results/thread-results";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useGetSearchPosts } from "@/features/search/api/use-get-search-posts";
import { useGetSearchThreads } from "@/features/search/api/use-get-search-threads";
import useSearchPost from "@/hooks/search-post-hook";
import { Loader2, Search, X } from "lucide-react";
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
      <div className="flex flex-col h-screen py-5">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold text-white capitalize">
            Search for a thread or post!
          </h1>
        </div>
        <div className="relative mx-4 flex items-center rounded-full h-[40px] my-4">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            //   ref={inputRef}
            type="text"
            placeholder="Type to search..."
            className="pl-8 pr-4 text-white"
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
        <div className="w-full overflow-y-auto border-white border-2 pt-5 flex-grow">
          {searchPost.searchQuery !== "" &&
            (threadsStatus !== "LoadingFirstPage" ||
            postsStatus !== "LoadingFirstPage" ? (
              <>
                <ThreadResults results={threads as Thread[]} />
                <PostResults results={posts} />
              </>
            ) : (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="w-20 h-20 animate-spin text-white" />
              </div>
            ))}
        </div>

        <Button
          className="text-sm text-center flex justify-center mx-4 my-4"
          onClick={searchPost.setOff}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ThreadModal;
