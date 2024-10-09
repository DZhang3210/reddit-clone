"use client";
import { Modal } from "@/components/ui/modal";
import ThreadCreate from "@/components/create-thread/thread-create";
import useToggleThread from "@/hooks/create-thread-hook";
import React from "react";

const ThreadModal = () => {
  const threadModal = useToggleThread();
  return (
    <Modal isOpen={threadModal.isOn} onClose={threadModal.setOff}>
      <ThreadCreate />
    </Modal>
  );
};

export default ThreadModal;
