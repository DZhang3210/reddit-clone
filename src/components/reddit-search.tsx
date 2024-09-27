"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
// Import necessary components for dropdown

const RedditSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // Add filters array
  // const filters = ["All", "Posts", "Comments", "Communities", "People"];

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 max-w-xl mx-4 rounded-full h-[40px]">
      <form
        onSubmit={handleSearch}
        className="relative flex items-center justify-center border border-gray-700 rounded-full bg-gray-800"
      >
        <button className="absolute left-2 top-3.5 h-8 w-8 text-gray-400">
          <Search size={30} />
        </button>
        <Input
          type="text"
          placeholder="Search for your favorite threads!"
          className="pl-12 pr-4 py-2 w-full text-white text-lg h-[60px] rounded-full placeholder:text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

export default RedditSearch;
