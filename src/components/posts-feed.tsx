"use client";
import React from "react";
import { Dog, Loader2 } from "lucide-react";
import { Doc, Id } from "../../convex/_generated/dataModel";
import PostCard from "./post-card";

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
  posts: Post[];
  isLoadingMore: boolean;
  loadMore: () => void;
  canLoadMore: boolean;
}

const PostsFeed = ({
  posts,
  loadMore,
  isLoadingMore,
  canLoadMore,
}: PostsPageProps) => {
  return (
    <div className="flex flex-col gap-4 mt-4 mb-20 ">
      {/* {posts.length > 0 && (
        <div className="max-w-3xl w-full mx-auto text-4xl flex justify-start">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="border-none text-black rounded-full text-base flex items-center transition-all duration-300 hover:bg-gray-300 gap-0"
            >
              <Button
                variant="outline"
                className="border-none text-black rounded-full text-lg flex items-center transition-all duration-300 hover:bg-gray-300 gap-0 "
                aria-label="dropdown-trigger"
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
      )} */}
      <div className="flex flex-col items-center gap-8">
        {posts.length > 0 ? (
          posts.map((post: Post) => {
            if (!post.thread || !post.user) return null;
            return (
              <div
                key={post._id}
                className="w-full flex flex-col gap-4 items-center"
              >
                <PostCard
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
    </div>
  );
};

export default PostsFeed;
