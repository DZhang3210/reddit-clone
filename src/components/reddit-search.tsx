"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";

const RedditSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex-1 max-w-xl mx-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search Reddit"
          className="pl-8 pr-4 py-2 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RedditSearch;
