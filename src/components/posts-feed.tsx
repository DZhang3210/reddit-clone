"use client";
import RedditPostCard from "@/components/reddit-post-card";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronDownIcon, Dog } from "lucide-react";
import { cn } from "@/lib/utils";
import { Doc, Id } from "../../convex/_generated/dataModel";

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
  numComments: number;
  firstComment?: Doc<"comments"> | null;
  isAdmin: boolean;
  isCreator: boolean;
};

interface PostsPageProps {
  currentFilter: string;
  isThreadPage?: boolean;
  posts: Post[];
}

const PostsFeed = ({ posts, currentFilter, isThreadPage }: PostsPageProps) => {
  const router = useRouter();

  const handleFilterChange = (filter: string) => {
    router.push(`?filter=${filter}`);
  };

  return (
    <div className="flex flex-col gap-4 mt-4 mb-20 mx-4 ">
      {posts.length > 0 && (
        <div className="max-w-3xl w-full mx-auto text-4xl flex justify-start">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="border-none text-black rounded-full text-base flex items-center transition-all duration-300 hover:bg-gray-300 gap-0"
            >
              <Button
                variant="outline"
                className="border-none text-black rounded-full text-lg flex items-center transition-all duration-300 hover:bg-gray-300 gap-0 "
              >
                {currentFilter}
                <ChevronDownIcon className="w-7 h-7 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[6rem] border-none text-lg p-0">
              <DropdownMenuLabel className="text-lg mb-1">
                Sort by
              </DropdownMenuLabel>
              {["Best", "New"].map((filter) => (
                <DropdownMenuItem
                  key={filter}
                  className={cn(
                    "text-lg cursor-pointer hover:font-bold",
                    currentFilter === filter ? "bg-white text-black" : ""
                  )}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div className="flex flex-col items-center gap-8">
        {posts.length > 0 ? (
          posts.map((post: Post) => {
            if (!post.thread || !post.user) return null;
            return (
              <div
                key={post._id}
                className="w-full flex flex-col gap-4 items-center"
              >
                <RedditPostCard
                  threadPage={isThreadPage}
                  isFollowing={post.thread.isFollowing || false}
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
                  comments={post.numComments}
                  threadImage={post.thread.image || ""}
                  isAdmin={post.isAdmin}
                  isOwner={post.isCreator}
                />
                {/* {post.firstComment && (
                <div className="max-w-sm">
                  {JSON.stringify(post.firstComment)}
                </div>
              )} */}
              </div>
            );
          })
        ) : (
          <div className="text-2xl font-bold text-black capitalize flex flex-col items-center">
            No posts found
            <Dog className="w-20 h-20" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsFeed;
