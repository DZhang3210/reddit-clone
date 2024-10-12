"use client";
import RedditThreadBanner from "@/components/thread-banner";
import { ThreadBannerSkeleton } from "@/components/skeletons/thread-banner-skeleton";
import { useGetUserThreads } from "@/features/profile/api/use-get-user-threads";
import React from "react";

const ThreadsPage = () => {
  const { data: threads, isLoading: threadsLoading } = useGetUserThreads();
  if (threadsLoading || !threads) {
    return (
      <div className="w-full flex flex-col justify-center items-center ">
        <h1 className="text-6xl">Threads</h1>
        <div className="w-full grid grid-cols-2 gap-4">
          <ThreadBannerSkeleton />
          <ThreadBannerSkeleton />
          <ThreadBannerSkeleton />
          <ThreadBannerSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-6xl">Threads</h1>
      <div className="w-full grid grid-cols-2">
        {threads?.map(
          (
            thread: any // eslint-disable-line @typescript-eslint/no-explicit-any
          ) => (
            <RedditThreadBanner
              key={thread._id}
              threadId={thread._id}
              backgroundImage={thread.bannerImage}
              threadImage={thread.logoImage}
              threadName={thread.title}
              threadDesc={thread.description}
              memberCount={thread.totalMembers}
              isFollowing={thread.isFollowing}
              bannerColor={thread.bannerColor}
              isAdmin={thread.isAdmin}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ThreadsPage;
