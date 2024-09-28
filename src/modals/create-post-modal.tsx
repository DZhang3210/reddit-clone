"use client";
import RedditCreatePost from "@/components/reddit-create-post";
import { Modal } from "@/components/ui/modal";
import useTogglePost from "@/hooks/create-post-hook";
import React from "react";

const PostModal = () => {
  const postModal = useTogglePost();
  return (
    <Modal isOpen={postModal.isOn} onClose={postModal.setOff}>
      <RedditCreatePost />
    </Modal>
  );
};

export default PostModal;
