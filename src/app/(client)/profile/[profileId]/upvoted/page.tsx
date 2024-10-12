"use client";
import React from "react";
import { useGetUserLiked } from "@/features/profile/api/use-get-user-liked";
import PostsFeed from "@/components/posts-feed";
import PostsFeedSkeleton from "@/components/skeletons/posts-feed-skeleton";

// type Post = {
//   image: string | null;
//   _id: Id<"posts">;
//   _creationTime: number;
//   title: string;
//   createdAt: number;
//   updatedAt: number;
//   content: string;
//   imageTitle: string;
//   likes: number;
//   user: Doc<"users"> | null;
//   thread: Doc<"threads"> | null;
//   liked: boolean | undefined;
//   saved: boolean | undefined;
// };

const UpvotedProfile = () => {
  const { results: posts, status, loadMore } = useGetUserLiked();

  if (status === "LoadingFirstPage") return <PostsFeedSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <PostsFeed
        posts={posts}
        currentFilter="liked"
        isLoadingMore={status === "LoadingMore"}
        loadMore={loadMore}
        canLoadMore={status === "CanLoadMore"}
      />
    </div>
  );
};

export default UpvotedProfile;
