"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetUserThreads } from "@/features/profile/api/use-get-user-threads";
import { usePathname } from "next/navigation";
import useToggleThread from "@/hooks/create-thread-hook";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  AlignJustify,
  ChevronDown,
  ChevronUp,
  Compass,
  Home,
  Plus,
  Users,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { motion } from "framer-motion";
import { FaReddit } from "react-icons/fa";

const MobileSidebar = () => {
  const { data: threads } = useGetUserThreads();
  const pathname = usePathname();
  const [communitiesTab, setCommunitiesTab] = useState(true);
  const threadModal = useToggleThread();
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

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
          "text-xs transition-all duration-300 rounded-2xl p-[0.6rem] border-transparent hover:border-gray-600 hover:bg-gray-800 cursor-pointer w-full flex items-center gap-2 text-gray-300",
          isActive && "bg-gray-800 border-gray-500"
        )}
        onClick={closeSheet}
      >
        <Icon size={20} className={cn(isActive && "text-white")} />
        <span className={cn(isActive && "font-bold text-white")}>
          {children}
        </span>
      </Link>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button onClick={() => setIsOpen(true)} aria-label="sidebar-trigger">
          <AlignJustify size={35} className="text-white" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-dark w-[320px] overflow-y-auto border-none"
        aria-describedby="mobile sidebar"
      >
        <SheetTitle className="sr-only">mobile sidebar</SheetTitle>
        <div className="left-0 bottom-0 w-full bg-gray-900/10">
          <Link
            href="/"
            className="w-full flex items-center"
            onClick={closeSheet}
          >
            <div className="flex items-center space-x-1 text-blue-500">
              {/* Reddit Logo */}
              <FaReddit size={50} />
              <h1 className="text-3xl font-bold text-white ">blueit</h1>
            </div>
          </Link>
          <div className="flex flex-col items-start justify-start h-full py-4 px-2 space-y-1">
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
              className="flex justify-between w-full px-2 items-center mt-[10rem] transition-all duration-300 hover:bg-gray-700 cursor-pointer py-2 rounded-lg text-white"
              onClick={() => setCommunitiesTab((prev) => !prev)}
            >
              <span className="text-xs text-gray-400 uppercase">Threads</span>
              {communitiesTab ? (
                <ChevronUp size={24} />
              ) : (
                <ChevronDown size={24} />
              )}
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
                    className="flex items-center gap-1 rounded-lg w-full transition-all duration-300 p-2 hover:bg-gray-700 cursor-pointer text-gray-300"
                    // href="/create/thread"
                  >
                    <Plus size={20} className="" />
                    <span
                      className="text-xs"
                      onClick={() => threadModal.setOn()}
                    >
                      Create a Thread
                    </span>
                  </div>
                  {threads ? (
                    <AnimatePresence>
                      {threads.map((thread, index) => (
                        <motion.div
                          key={thread._id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <Link
                            href={`/thread/${thread._id}`}
                            className="flex items-center gap-2 rounded-lg w-full transition-all duration-300 p-2 hover:bg-gray-700 cursor-pointer"
                            onClick={closeSheet}
                          >
                            <Avatar className="h-8 w-8 xl:h-9 xl:w-9">
                              <AvatarImage
                                src={thread.logoImage || ""}
                                alt="thread image"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-100">
                              r/{thread.title}
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </AnimatePresence>
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
