"use client";
import { useGetThreads } from "@/features/threads/api/use-get-threads";
import React from "react";
import RedditThreadBanner from "@/components/thread-banner";
import { ThreadBannerSkeleton } from "@/components/skeletons/thread-banner-skeleton";

// type Thread = Doc<"threads"> & { isFollowing: boolean };

const ThreadsPage = () => {
  const { results: threads, status } = useGetThreads({ name: "" });

  if (status === "LoadingFirstPage" || !threads) {
    return (
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-full grid grid-cols-2 gap-4 px-6">
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
      <h1 className="text-5xl mt-5 ml-5 pb-2 font-bold text-black w-full border-b-[2px] border-gray-600">
        Explore Threads
      </h1>
      <div className="ml-8 my-5 font-semibold text-gray-700 text-2xl">
        Recommended for you
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4 px-12">
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
