"use client";
import { useGetPosts } from "@/features/posts/api/use-get-posts";
import React from "react";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";
import PostCard from "@/components/post-card";

type Post = {
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
  thread:
    | (Doc<"threads"> & {
        image: string | null;
        isFollowing: boolean | undefined;
      })
    | null;
  liked: boolean | undefined;
  saved: boolean | undefined;
};

const PostsPage = () => {
  const { results: posts, status } = useGetPosts({ name: "" });
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter")
    ? searchParams.get("filter")
    : "Best";

  if (status === "LoadingFirstPage" || !posts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 mt-4 mx-4 ">
      <div className="max-w-2xl w-full mx-auto text-4xl flex justify-start">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="dropdown-trigger"
              variant="outline"
              className="border-none text-gray-400 rounded-full text-base flex items-center transition-all duration-300 hover:bg-gray-300 gap-0"
            >
              {currentFilter}
              <ChevronDownIcon className="w-7 h-7 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[6rem] bg-black/90 text-white border-none text-lg">
            <DropdownMenuLabel className="text-lg mb-1">
              Sort by
            </DropdownMenuLabel>
            <DropdownMenuItem className="text-lg cursor-pointer hover:font-bold">
              Best
            </DropdownMenuItem>
            <DropdownMenuItem className="text-lg cursor-pointer hover:font-bold">
              New
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {posts.map((post: Post) => {
        if (!post.thread || !post.user) return null;
        return (
          <PostCard
            key={post._id}
            username={post.user?.name || "anonymous"}
            subreddit={post.thread.title}
            timePosted={post._creationTime}
            title={post.title}
            content={post.content}
            image={post.image || ""}
            upvotes={post.likes}
            threadId={post.thread._id}
            userId={post.user._id}
            postId={post._id}
            liked={post.liked || false}
            saved={post.saved || false}
            threadImage={post?.thread?.image || ""}
          />
        );
      })}
    </div>
  );
};

export default PostsPage;
