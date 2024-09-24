"use client";
import React from "react";
import { Doc, Id } from "../../../../../../convex/_generated/dataModel";
import RedditPostCard from "@/components/reddit-post-card";
import { useGetUserLiked } from "@/features/profile/api/use-get-user-liked";

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
};

const UpvotedProfile = () => {
  const { data: posts, isLoading: postsLoading } = useGetUserLiked();

  if (postsLoading || !posts) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="text-4xl">Title</div>
      <div className="flex flex-col gap-4">
        {posts.map((post: Post) => {
          if (!post.thread || !post.user) return null;
          return (
            <RedditPostCard
              key={post._id}
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default UpvotedProfile;
