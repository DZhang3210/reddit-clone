"use client";
import React from "react";
import StatCard from "./_components/stat-card";
import { useGetUserStats } from "@/features/profile/api/use-get-user-stats";
import StatCardSkeleton from "./_components/stat-card-skeleton";
import PostsFeedSkeleton from "@/components/posts-feed-skeleton";

const OverviewProfile = () => {
  const { data: stats, isLoading: statsLoading } = useGetUserStats();

  if (statsLoading || !stats) {
    return <PostsFeedSkeleton />;
  }
  const {
    followingThreadsLength,
    savedPostsLength,
    upvotedPostsLength,
    createdPostsLength,
  } = stats;

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <StatCard stat="Threads" number={followingThreadsLength} />
      <StatCard stat="Comments" number={100} />
      <StatCard stat="Posts" number={createdPostsLength} />
      <StatCard stat="Upvoted Posts" number={upvotedPostsLength} />
      <StatCard stat="Saved Posts" number={savedPostsLength} />
    </div>
  );
};

export default OverviewProfile;
