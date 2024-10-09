"use client";
import { Modal } from "@/components/ui/modal";
import useFocusImage from "@/hooks/focus-image-hook";
import Image from "next/image";
import React from "react";

const PostModal = () => {
  const focusImage = useFocusImage();
  return (
    <Modal isOpen={focusImage.imageLink !== null} onClose={focusImage.setOff}>
      <div className="aspect-square relative overflow-hidden rounded-md">
        {focusImage.imageLink && (
          <Image
            src={focusImage.imageLink}
            alt="Post content"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
            priority
            className="rounded-md"
          />
        )}
        <div className="absolute top-2 right-2 bg-black/80 p-2 rounded-full">
          <button onClick={focusImage.setOff}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
