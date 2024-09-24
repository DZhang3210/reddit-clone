"use client";

import { useGetPost } from "@/features/posts/api/use-get-post";
import React from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import RedditPostCard from "@/components/reddit-post-card";

interface PostPageProps {
  params: {
    postId: string;
  };
}

const PostPage = ({ params: { postId } }: PostPageProps) => {
  const { data: post, isLoading } = useGetPost({ id: postId as Id<"posts"> });
  console.log(post);
  if (isLoading || !post) return <div>Loading...</div>;
  if (!post.thread || !post.user) return null;

  return (
    <div className="mx-4 mt-4">
      <RedditPostCard
        key={post._id}
        username={post.user?.name || "anonymous"}
        userAvatar={post.user?.image || "/placeholder.svg?height=40&width=40"}
        subreddit={post.thread.title}
        timePosted={post._creationTime || 0}
        title={post.title || ""}
        content={post.content || ""}
        image={post.image || ""}
        upvotes={post.likes || 0}
        threadId={post.thread._id}
        userId={post.user._id}
        postId={post._id || ("" as Id<"posts">)}
        liked={post.liked || false}
        saved={post.saved || false}
      />
    </div>
  );
};

export default PostPage;
