"use client";
import {
  ChevronDown,
  ChevronUp,
  Compass,
  Home,
  Plus,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { Separator } from "./ui/separator";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUserThreads } from "@/features/profile/api/use-get-user-threads";
import { Skeleton } from "./ui/skeleton";
import useToggleThread from "@/hooks/create-thread-hook";

const Sidebar = () => {
  const { data: threads, isLoading: threadsLoading } = useGetUserThreads();
  const pathname = usePathname();
  const [communitiesTab, setCommunitiesTab] = useState(true);
  const threadModal = useToggleThread();

  const NavLink = ({
    href,
    icon: Icon,
    children,
  }: {
    href: string;
    icon: React.ElementType;
    children: React.ReactNode;
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "text-2xl text-white transition-all duration-300 border-2 rounded-2xl p-3 border-transparent hover:border-gray-500 hover:bg-gray-800 cursor-pointer w-full flex items-center gap-2",
          isActive && "bg-gray-800 border-gray-500"
        )}
      >
        <Icon size={28} className={cn(isActive && "text-white-500")} />
        <span className={cn(isActive && "font-bold")}>{children}</span>
      </Link>
    );
  };

  return (
    <div className="left-0 bottom-0 h-[calc(100vh-120px)] bg-black w-[17rem]">
      <div className="flex flex-col items-start justify-start h-full py-4 px-2 space-y-2">
        <NavLink href="/posts" icon={Home}>
          Home
        </NavLink>
        <NavLink href="/popular" icon={Compass}>
          Popular
        </NavLink>
        <NavLink href="/thread" icon={Users}>
          Explore
        </NavLink>

        {/* <Separator className="w-full my-4" /> */}

        {/* Communities */}
        <div
          className="flex justify-between w-full px-2 items-center mt-[10rem] transition-all duration-300 hover:bg-gray-700 cursor-pointer py-4 rounded-lg"
          onClick={() => setCommunitiesTab((prev) => !prev)}
        >
          <span className="text-lg text-foreground uppercase">Threads</span>
          {communitiesTab ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
        <AnimatePresence>
          {communitiesTab && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-1 flex flex-col gap-2 w-full overflow-hidden"
            >
              <div
                className="flex items-center gap-2 rounded-lg w-full transition-all duration-300 p-2 hover:bg-gray-700 cursor-pointer"
                // href="/create/thread"
              >
                <Plus size={40} />
                <span
                  className="text-lg text-white"
                  onClick={() => threadModal.setOn()}
                >
                  Create a Thread
                </span>
              </div>
              {threads ? (
                threads.map((thread, i) => (
                  <Link
                    key={thread._id}
                    href={`/thread/${thread._id}`}
                    className="flex items-center gap-2 rounded-lg w-full transition-all duration-300 p-2 hover:bg-gray-700 cursor-pointer"
                  >
                    <Avatar>
                      <AvatarImage src={thread.logoImage || ""} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-lg text-white">r/{thread.title}</span>
                  </Link>
                ))
              ) : (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 rounded-lg w-full p-2">
                    <Skeleton className="h-10 w-10 rounded-full bg-white" />
                    <Skeleton className="h-6 w-48 bg-white" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg w-full p-2">
                    <Skeleton className="h-10 w-10 rounded-full bg-white" />
                    <Skeleton className="h-6 w-48 bg-white" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg w-full p-2">
                    <Skeleton className="h-10 w-10 rounded-full bg-white" />
                    <Skeleton className="h-6 w-48 bg-white" />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sidebar;
