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
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";
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
  thread: Doc<"threads"> | null;
  liked: boolean | undefined;
  saved: boolean | undefined;
  numComments: number;
  firstComment?: Doc<"comments"> | null;
};

interface PostsPageProps {
  posts: Post[];
}

const PostsFeed = ({ posts }: PostsPageProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentFilter = searchParams.get("filter") || "Best";

  const handleFilterChange = (filter: string) => {
    router.push(`?filter=${filter}`);
  };

  return (
    <div className="flex flex-col gap-4 mt-4 mx-4 ">
      <div className="max-w-4xl w-full mx-auto text-4xl flex justify-start">
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
      <div className="flex flex-col items-center gap-8">
        {posts.map((post: Post) => {
          if (!post.thread || !post.user) return null;
          return (
            <div
              key={post._id}
              className="w-full flex flex-col gap-4 items-center"
            >
              <RedditPostCard
                username={post.user?.name || "anonymous"}
                userAvatar={
                  post.user?.image || "/placeholder.svg?height=40&width=40"
                }
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
              />
              {/* {post.firstComment && (
                <div className="max-w-sm">
                  {JSON.stringify(post.firstComment)}
                </div>
              )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostsFeed;
