"use client";
import PostResults from "@/components/results/post-results";
import { useGetSearchPosts } from "@/features/search/api/use-get-search-posts";
import React from "react";

interface ResultsPostsPageProps {
  params: {
    keyword: string;
  };
}

const ResultsPostsPage: React.FC<ResultsPostsPageProps> = ({ params }) => {
  const {
    results: posts,
    status: postsStatus,
    loadMore,
  } = useGetSearchPosts({
    query: params.keyword || "",
  });

  return (
    <div className="max-w-6xl mx-auto w-full">
      <PostResults
        results={posts}
        loadMore={loadMore}
        canLoadMore={postsStatus === "CanLoadMore"}
        isLoadingMore={postsStatus === "LoadingMore"}
      />
    </div>
  );
};

export default ResultsPostsPage;
