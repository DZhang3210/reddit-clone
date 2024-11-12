"use client";
import { useGetThreads } from "@/features/threads/api/use-get-threads";
import React from "react";
import { ThreadBannerSkeleton } from "@/components/skeletons/thread-banner-skeleton";
import MiniThreadBanner from "@/components/mini-thread-banner";

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
    <div className="w-full flex flex-col px-4">
      <div className="w-full px-12 space-y-10">
        <h1 className="text-5xl pt-5 font-bold text-white w-full mb-4">
          Explore Threads
        </h1>
        <div className="font-bold text-gray-white text-2xl">
          Recommended for you
        </div>
      </div>
      <div className="mt-4 w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-5 gap-4 px-12">
        {threads?.map(
          (
            thread: any // eslint-disable-line @typescript-eslint/no-explicit-any
          ) => <MiniThreadBanner thread={thread} key={thread._id} />
        )}
      </div>
    </div>
  );
};

export default ThreadsPage;
