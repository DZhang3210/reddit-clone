"use client";
import { Search as SearchIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { Input } from "./ui/input";

import { useGetSearchThreads } from "@/features/search/api/use-get-search-threads";
import { Thread } from "./results/thread-results";
import ThreadResults from "./results/thread-results";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { results: threads, status: threadsStatus } = useGetSearchThreads({
    query: searchQuery || "",
  });
  // Add filters array
  // const filters = ["All", "Posts", "Comments", "Communities", "People"];

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/result/${encodeURIComponent(trimmedQuery)}/posts`);
      setSearchQuery("");
    }
  };

  const handleSearchClick = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/result/${encodeURIComponent(trimmedQuery)}/posts`);
      setSearchQuery("");
    }
  };

  return (
    <div className="relative sm:flex-1 max-w-xl mx-4 h-1/2 rounded-full">
      {searchQuery.trim().length > 0 &&
        threadsStatus !== "LoadingFirstPage" && (
          <div className="absolute top-full left-0 w-full bg-[#0F111A]">
            <div className="w-full overflow-y-auto pt-5 flex-grow p-4">
              {threads.length > 0 ? (
                <>
                  <div className="text-gray-400 text-base font-bold mb-1">
                    Threads
                  </div>
                  <ThreadResults
                    results={threads as Thread[]}
                    setSearchQuery={setSearchQuery}
                  />
                </>
              ) : (
                <div className="flex items-center gap-2 text-gray-400 text-base">
                  <SearchIcon size={22} className="" />
                  Search for &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          </div>
        )}
      <form
        onSubmit={handleSearch}
        className="relative rounded-full h-full flex gap-1 px-4"
      >
        <button
          type="button"
          className="text-gray-400"
          onClick={handleSearchClick}
          aria-label="search-trigger"
        >
          <SearchIcon size={22} className="text-white" />
        </button>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for your favorite threads!"
          className="w-full h-full text-white text-lg rounded-full placeholder:text-base placeholder:text-gray-400 border-0 outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 hidden sm:block"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
