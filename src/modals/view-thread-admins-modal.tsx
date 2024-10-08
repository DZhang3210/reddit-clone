"use client";
// import ThreadCreate from "@/app/(client)/create/thread/_components/thread-create";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import useViewThreadMembers from "@/hooks/view-thread-admins-hook";
import React from "react";

// interface ThreadAdminItemProps {
//   userId: string;
//   username: string;
//   image: string;
// }

// const ThreadAdminItem = ({ userId, username, image }: ThreadAdminItemProps) => {
//   const fallbackLetter = username ? username.charAt(0).toUpperCase() : "?";
//   return (
//     <div className="flex items-center space-x-3">
//       <Avatar>
//         <AvatarImage src={image} alt={username || "User"} />
//         <AvatarFallback>{fallbackLetter}</AvatarFallback>
//       </Avatar>
//       <span className="text-sm font-medium">
//         {username || "Anonymous User"}
//       </span>
//     </div>
//   );
// };

const ViewThreadAdminsModal = () => {
  const threadModal = useViewThreadMembers();
  return (
    <Modal isOpen={threadModal.threadId !== null} onClose={threadModal.setOff}>
      <div></div>
    </Modal>
  );
};

export default ViewThreadAdminsModal;
