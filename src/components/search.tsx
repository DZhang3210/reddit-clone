"use client";
import { Search as SearchIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import useSearchPost from "@/hooks/search-post-hook";

const Search = () => {
  const searchPost = useSearchPost();
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  // Add filters array
  // const filters = ["All", "Posts", "Comments", "Communities", "People"];

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleClick = () => {
    searchPost.setSearchQuery("");
  };

  return (
    <div
      className="sm:flex-1 max-w-xl mx-4 h-1/2 rounded-full"
      onClick={handleClick}
    >
      <form
        onSubmit={handleSearch}
        className="relative rounded-full h-full flex gap-1 px-4"
      >
        <button
          className="text-gray-400 aria-label='search'"
          onClick={handleClick}
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