"use client";
import PostModal from "@/modals/create-post-modal";
import ThreadModal from "@/modals/create-thread-modal";
import FocusImageModal from "@/modals/focus-image-modal";
import SearchPostModal from "@/modals/search-post-modal";
import SharePostModal from "@/modals/share-post-modal";
import { useEffect, useState } from "react";
import React from "react";

const Modals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return "";
  return (
    <div>
      <PostModal />
      <ThreadModal />
      <SharePostModal />
      <SearchPostModal />
      <FocusImageModal />
    </div>
  );
};

export default Modals;
