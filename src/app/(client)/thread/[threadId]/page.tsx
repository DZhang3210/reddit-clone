"use client";
import { useGetThread } from "@/features/threads/api/use-get-thread";
import React from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { ThreadBannerSkeleton } from "@/components/skeletons/thread-banner-skeleton";
import PostsFeed from "@/components/posts-feed";
import { useGetPosts } from "@/features/posts/api/use-get-posts";
import ThreadBanner from "@/components/thread-banner";

interface ThreadPageProps {
  params: {
    threadId: string;
  };
}

const ThreadPage = ({ params: { threadId } }: ThreadPageProps) => {
  const { data: thread, isLoading: threadLoading } = useGetThread({
    id: threadId as Id<"threads">,
  });

  const {
    results: posts,
    status,
    loadMore,
  } = useGetPosts({
    threadId: threadId as Id<"threads">,
  });
  if (threadLoading) {
    return <ThreadBannerSkeleton />;
  }

  if (!thread) {
    return <div>Data not found</div>;
  }
  return (
    <div>
      <ThreadBanner
        backgroundImage={thread.bannerImage}
        threadId={thread._id}
        threadImage={thread.logoImage}
        threadDesc={thread.description}
        memberCount={thread.totalMembers}
        isFollowing={thread.isFollowing}
        threadName={thread.title}
        bannerColor={thread.bannerColor}
        isAdmin={thread.isAdmin}
      />
      <PostsFeed
        posts={posts}
        isLoadingMore={status === "LoadingMore"}
        loadMore={loadMore}
        canLoadMore={status === "CanLoadMore"}
      />
    </div>
  );
};

export default ThreadPage;
