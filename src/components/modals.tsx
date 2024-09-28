"use client";
import PostModal from "@/modals/create-post-modal";
import ThreadModal from "@/modals/create-thread-modal";
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
    </div>
  );
};

export default Modals;