"use client";

import { useGetThreadAdmins } from "@/features/threads/api/use-get-admins";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { CheckIcon, Clipboard } from "lucide-react";
import { useChangeInviteCode } from "@/features/threads/api/use-change-invite-code";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";
import { Id } from "../../../../../convex/_generated/dataModel";
import RedditThreadBanner from "@/components/thread-banner";
import Link from "next/link";

const ViewThreadAdminsModal = ({
  params: { threadId },
}: {
  params: { threadId: Id<"threads"> | null };
}) => {
  const { data: thread } = useGetThreadAdmins({
    id: threadId as Id<"threads"> | null,
  });
  // console.log(thread);
  const adminsData = thread?.moderators;
  const [isCopied, setIsCopied] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const { mutate: changeInviteCode } = useChangeInviteCode();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to change the invite code?",
    "This will change the invite code for this thread"
  );

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
        onSuccess: () => {
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
    <>
      <ConfirmDialog />
      {adminsData && (
        <div
          className={cn(
            "flex flex-col gap-4 max-h-screen overflow-y-auto pb-20 sm:pt-0 text-black"
          )}
        >
          <RedditThreadBanner
            threadId={thread?._id}
            threadImage={thread?.logoImage}
            threadDesc={thread?.description}
            bannerColor={thread?.bannerColor}
            backgroundImage={thread?.threadImage}
            isAdmin={true}
            isFollowing={thread?.isFollowing}
          />
          <div className="flex flex-col gap-2 p-4">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold flex-grow border-b-2 border-white">
                Admins
              </h1>
              <p className="text-sm text-gray-500">Current Admin</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {adminsData.map((admin) => (
                <div
                  key={admin?._id}
                  onClick={() => {}}
                  aria-label="admin-link"
                  className="flex items-center gap-2 rounded-md transition w-full border p-2"
                >
                  <Avatar>
                    <AvatarImage src={admin?.image} alt={admin?.name} />
                    <AvatarFallback>{admin?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <Link
                      href={`/profile/${admin?._id}`}
                      className="hover:underline text-base"
                    >
                      {admin?.name}
                    </Link>
                    <Link
                      href={`/profile/${admin?._id}`}
                      className="text-xs text-gray-500 hover:underline"
                    >
                      r/{admin?.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {thread?.isAdmin && (
              <div className="flex flex-col gap-2 pt-4">
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold w-full border-b-2 border-white ">
                    Invite Link
                  </h1>
                  <p className="text-sm text-gray-500">
                    Send an invite to join as a moderator
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex flex-col border rounded-2xl p-2">
                    <div className="text-sm font-semibold">Web Link</div>
                    <div className="flex w-full items-center gap-4 text-xs">
                      <Input
                        readOnly
                        className="flex-grow"
                        value={`${process.env.NEXT_PUBLIC_APP_URL}/invite/${thread?._id}`}
                      />

                      <button
                        onClick={handleCopyLink}
                        aria-label="copy link button"
                        className="bg-black text-white p-2 rounded-md"
                      >
                        {isCopied ? (
                          <CheckIcon className="h-4 w-4" />
                        ) : (
                          <div>
                            <Clipboard className="h-4 w-4" />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col border rounded-2xl p-2">
                    <div className="text-sm font-semibold">Moderator Code:</div>
                    <div className="flex items-center gap-2">
                      <Input
                        readOnly
                        value={thread?.moderatorCode}
                        className="flex-grow min-w-0"
                      />
                      <button
                        onClick={handleCopyCode}
                        className="flex-shrink-0 bg-black text-white p-2 rounded-md"
                        aria-label="copy code button"
                      >
                        {isCodeCopied ? (
                          <CheckIcon className="h-4 w-4" />
                        ) : (
                          <div>
                            <Clipboard className="h-4 w-4" />
                          </div>
                        )}
                      </button>
                    </div>
                    <button
                      onClick={handleChangeInviteCode}
                      className="flex w-full justify-start text-xs text-blue-500 hover:underline indent-2"
                      disabled={thread?.moderatorCode === null}
                      aria-label="change code button"
                    >
                      Change Code
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewThreadAdminsModal;
