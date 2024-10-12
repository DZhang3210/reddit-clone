"use client";
import RedditThreadBanner from "@/components/thread-banner";
import { useGetThread } from "@/features/threads/api/use-get-thread";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Id } from "../../../../../convex/_generated/dataModel";
import { ThreadBannerSkeleton } from "@/components/skeletons/thread-banner-skeleton";
import PostsFeed from "@/components/posts-feed";
import { useGetPosts } from "@/features/posts/api/use-get-posts";

interface ThreadPageProps {
  params: {
    threadId: string;
  };
}

const ThreadPage = ({ params: { threadId } }: ThreadPageProps) => {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "Best";
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
      <RedditThreadBanner
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
        currentFilter={currentFilter}
        isThreadPage={true}
        isLoadingMore={status === "LoadingMore"}
        loadMore={loadMore}
        canLoadMore={status === "CanLoadMore"}
      />
    </div>
  );
};
// interface RedditThreadBannerProps {
//   backgroundImage?: string | null;
//   threadId: Id<"threads">;
//   threadImage?: string | null;
//   threadName?: string;
//   threadDesc: string;
//   memberCount?: number;
//   isFollowing?: boolean | null;
// }

export default ThreadPage;
