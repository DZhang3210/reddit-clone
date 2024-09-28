"use client";
import ThreadCreate from "@/app/(client)/create/thread/_components/thread-create";
import { Modal } from "@/components/ui/modal";
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
