"use client";
import ThreadResultsPage, {
  Thread,
} from "@/components/results/results-thread-feed";

import { useGetSearchThreads } from "@/features/search/api/use-get-search-threads";
import React from "react";

const ResultsThreadsPage = ({ params }: { params: { keyword: string } }) => {
  const { results: threads } = useGetSearchThreads({
    query: params.keyword || "",
  });
  return (
    <div className="max-w-6xl mx-auto">
      <ThreadResultsPage results={threads as Thread[]} />
    </div>
  );
};

export default ResultsThreadsPage;
