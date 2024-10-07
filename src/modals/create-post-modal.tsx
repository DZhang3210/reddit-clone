"use client";
import RedditCreatePost from "@/components/reddit-create-post";
import { Modal } from "@/components/ui/modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTogglePost from "@/hooks/create-post-hook";
import React from "react";

const PostModal = () => {
  const postModal = useTogglePost();
  return (
    <ScrollArea className="h-[80vh]">
      <Modal isOpen={postModal.isOn} onClose={postModal.setOff}>
        <RedditCreatePost />
      </Modal>
    </ScrollArea>
  );
};

export default PostModal;
