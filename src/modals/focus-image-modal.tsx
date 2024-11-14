"use client";
import { Modal } from "@/components/ui/modal";
import useFocusImage from "@/hooks/focus-image-hook";
import Image from "next/image";
import React from "react";

const PostModal = () => {
  const focusImage = useFocusImage();
  return (
    <Modal isOpen={focusImage.imageLink !== null} onClose={focusImage.setOff}>
      <div className="relative w-full max-w-[90vw] h-[90vh] mx-auto">
        {focusImage.imageLink && (
          <Image
            src={focusImage.imageLink}
            alt="Post content"
            fill
            sizes="90vw"
            className="object-contain rounded-lg"
            priority
          />
        )}
        <button
          onClick={focusImage.setOff}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-zinc-800/80 hover:bg-zinc-800 transition-colors"
          aria-label="Close modal"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            className="text-zinc-100"
          >
            <path
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </Modal>
  );
};

export default PostModal;
