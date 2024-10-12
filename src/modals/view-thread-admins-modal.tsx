"use client";
// import ThreadCreate from "@/app/(client)/create/thread/_components/thread-create";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { useGetThreadAdmins } from "@/features/threads/api/use-get-admins";
import React from "react";
import { Id } from "../../convex/_generated/dataModel";
import useViewThreadAdmins from "@/hooks/view-thread-admins-hook";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { CheckIcon } from "lucide-react";
import { useChangeInviteCode } from "@/features/threads/api/use-change-invite-code";
import { useConfirm } from "@/hooks/use-confirm";

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
  const threadModal = useViewThreadAdmins();
  const { data: thread } = useGetThreadAdmins({
    id: threadModal.threadId as Id<"threads"> | null,
  });
  console.log(thread);
  const adminsData = thread?.moderators;
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const { mutate: changeInviteCode } = useChangeInviteCode();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to change the invite code?",
    "This will change the invite code for this thread"
  );

  const handleLink = (id: string) => {
    router.push(`/profile/${id}`);
    threadModal.setOff();
  };

  const handleCopyLink = () => {
    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${thread?._id}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      setIsCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  const handleChangeInviteCode = async () => {
    const ok = await confirm();
    if (!ok) return;
    changeInviteCode(
      { id: thread?._id as Id<"threads"> },
      {
        onSuccess: (data) => {
          toast.success("Invite code changed!");
        },
      }
    );
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(thread?.moderatorCode || "");
    setIsCodeCopied(true);
    toast.success("Code copied!");
    setTimeout(() => setIsCodeCopied(false), 2000);
  };

  return (
    <Modal isOpen={threadModal.threadId !== null} onClose={threadModal.setOff}>
      <ConfirmDialog />
      {adminsData && (
        <div className="flex flex-col gap-4 px-4 overflow-y-auto max-h-1/2">
          <div className="text-lg font-semibold flex-grow pb-2 border-b-2 border-white">
            Thread Details
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src={thread?.threadImage || ""}
                    alt="Thread Banner"
                    className="object-cover"
                  />
                  <AvatarFallback className="text-3xl">
                    {thread?.title.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="text-2xl font-semibold">{thread?.title}</div>
            </div>
            <div className="text-base">
              Total Members: {thread?.totalMembers}
            </div>
          </div>
          <div className="text-lg font-semibold flex-grow pb-2 border-b-2 border-white">
            Admins
          </div>
          {adminsData.map((admin) => (
            <button
              key={admin?._id}
              onClick={() => handleLink(admin?._id as string)}
              className="flex items-center gap-2 hover:bg-gray-500 p-2 rounded-md transition"
            >
              <Avatar>
                <AvatarImage src={admin?.image} alt={admin?.name} />
                <AvatarFallback>{admin?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div key={admin?._id} className="hover:underline">
                {admin?.name}
              </div>
            </button>
          ))}
          {thread?.isAdmin && (
            <>
              <div className="text-lg font-semibold w-full border-b-2 border-white pb-2">
                Invite
              </div>
              <div className="text-sm text-gray-400">
                Send an invite to join as a moderator
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-32">Invite Link:</div>
                <Input
                  readOnly
                  value={`${process.env.NEXT_PUBLIC_APP_URL}/invite/${thread?._id}`}
                  className="flex-grow"
                />
                <Button onClick={handleCopyLink}>
                  {isCopied ? <CheckIcon /> : <div>Copy</div>}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-32">Moderator Code:</div>
                <Input
                  readOnly
                  value={thread?.moderatorCode}
                  className="flex-grow min-w-0"
                />
                <Button onClick={handleCopyCode} className="flex-shrink-0">
                  {isCodeCopied ? <CheckIcon /> : <div>Copy</div>}
                </Button>
                <Button
                  onClick={handleChangeInviteCode}
                  className="flex-shrink-0"
                  disabled={thread?.moderatorCode === null}
                >
                  Change Code
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ViewThreadAdminsModal;
