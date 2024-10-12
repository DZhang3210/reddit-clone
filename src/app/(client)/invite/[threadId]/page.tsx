"use client";
import { Button } from "@/components/ui/button";
import { useGetThreadAdmins } from "@/features/threads/api/use-get-admins";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import VerificationInput from "react-verification-input";
import { toast } from "sonner";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useAddModerator } from "@/features/threads/api/use-add-moderator";

const JoinPage = ({
  params: { threadId },
}: {
  params: { threadId: string };
}) => {
  const router = useRouter();
  const { data: thread } = useGetThreadAdmins({
    id: threadId as Id<"threads">,
  });

  const { mutate: addModerator } = useAddModerator();

  useEffect(() => {
    if (thread?.isAdmin) {
      router.push(`/thread/${threadId}`);
    }
  }, [thread?.isAdmin, router, threadId]);

  const handleComplete = (value: string) => {
    addModerator(
      { id: threadId as Id<"threads">, code: value },
      {
        onSuccess: (id) => {
          router.replace(`/thread/${id}`);
          toast.success("Workspace joined");
        },
        onError: () => {
          toast.error("Failed to join workspace");
        },
      }
    );
  };

  if (!thread) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md">
      <Image src="/kita-image.webp" width={60} height={60} alt="logo" />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold text-black">
            Join {thread.title}{" "}
          </h1>
          <p className="text-md text-muted-foreground">
            Enter workspace code to join
          </p>
        </div>
        <VerificationInput
          onComplete={handleComplete}
          length={6}
          classNames={{
            container: cn(
              "flex gap-x-2"
              // isPending && "opacity-50 cursor-not-allowed"
            ),
            character:
              "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500 ",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
          autoFocus
        />
      </div>
      <div className="flex gap-x-4">
        <Button
          size="lg"
          variant="outline"
          className="flex-shrink-0 text-black"
        >
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
