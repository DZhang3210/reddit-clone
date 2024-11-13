"use client";
import { useGetThreads } from "@/features/threads/api/use-get-threads";
import React from "react";
import MiniThreadBanner from "@/components/mini-thread-banner";
// import MiniThreadBannerSkeleton from "@/components/skeletons/mini-thread-banner-skeleton";
// import { Skeleton } from "@/components/ui/skeleton";

// type Thread = Doc<"threads"> & { isFollowing: boolean };

const ThreadsPage = () => {
  const { results: threads } = useGetThreads({ name: "" });

  // if (status === "LoadingFirstPage" || !threads) {
  //   return (
  //     <div className="w-full flex flex-col justify-center items-center bg-gray-600 p-4">
  //       <div className="flex flex-col items-start  gap-4 w-full">
  //         <Skeleton className="w-[350px] h-14" />
  //         <Skeleton className="w-[250px] h-8 my-6" />
  //       </div>
  //       <div className="w-full grid grid-cols-2 gap-4 px-6">
  //         <MiniThreadBannerSkeleton />
  //         <MiniThreadBannerSkeleton />
  //         <MiniThreadBannerSkeleton />
  //         <MiniThreadBannerSkeleton />
  //       </div>
  //       <div className="flex flex-col items-start  gap-4 w-full">
  //         <Skeleton className="w-[250px] h-8 my-6" />
  //       </div>
  //       <div className="w-full grid grid-cols-2 gap-4 px-6">
  //         <MiniThreadBannerSkeleton />
  //         <MiniThreadBannerSkeleton />
  //         <MiniThreadBannerSkeleton />
  //         <MiniThreadBannerSkeleton />
  //       </div>
  //     </div>
  //   );
  // }

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
