"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import useToggleSharePost from "@/hooks/share-post-hook";
import { Check, Copy } from "lucide-react";
import React, { useRef, useState } from "react";

const SharePostModal = () => {
  const sharePostModal = useToggleSharePost();
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
    }
  };
  const shareableLink = `https://${process.env.NEXT_PUBLIC_APP_URL}/post/${sharePostModal.link}`;
  return (
    <Modal
      isOpen={sharePostModal.link !== ""}
      onClose={sharePostModal.setOff}
      //   light={true}
    >
      <div className="flex flex-col items-center justify-center space-y-2 px-12">
        <div className="text-lg font-semibold">
          Share your post with your friends
        </div>
        <div className="flex items-center space-x-2 px-10 w-full">
          <Input
            ref={inputRef}
            readOnly
            value={shareableLink}
            className="flex-grow"
          />
          <Button size="sm" className="px-3" onClick={copyToClipboard}>
            <span className="sr-only">Copy</span>
            {isCopied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4 " />
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SharePostModal;