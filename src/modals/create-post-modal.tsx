"use client";
import CreatePost from "@/components/create-post";
import { Modal } from "@/components/ui/modal";
import useTogglePost from "@/hooks/create-post-hook";
import React from "react";

const PostModal = () => {
  const postModal = useTogglePost();
  return (
    <Modal isOpen={postModal.isOn} onClose={postModal.setOff}>
      <CreatePost />
    </Modal>
  );
};

export default PostModal;
