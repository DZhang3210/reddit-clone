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
    <div className="flex-1 max-w-xl mx-4">
      <form onSubmit={handleSearch} className="relative flex items-center">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search Redditt"
          className="pl-8 pr-4 py-2 w-full text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Add dropdown menu */}
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="ml-2 text-white">
              {filter}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="space-y-2">
              {filters.map((f) => (
                <Button
                  key={f}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setFilter(f)}
                >
                  {f}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover> */}
      </form>
    </div>
  );
};

export default RedditSearch;
