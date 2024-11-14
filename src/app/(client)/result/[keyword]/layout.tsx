"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ResultsLayout({
  children,
  params: { keyword },
}: {
  children: React.ReactNode;
  params: { keyword: string };
}) {
  const pathname = usePathname();
  const isPosts = pathname.split("/").pop() === "posts";
  const isThreads = pathname.split("/").pop() === "threads";
  const searchQuery = pathname.split("/")[2];
  return (
    <section className="flex flex-col gap-y-2 mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-300 pt-4">
          Search results for &quot;{searchQuery}&quot;
        </h1>
      </div>
      <div className="flex gap-x-4 my-4">
        <Link
          href={`/result/${keyword}/posts`}
          className={cn(
            "text-gray-200 rounded-full px-4 py-2 hover:bg-gray-300/20",
            isPosts && "text-white bg-gray-300/20"
          )}
        >
          Posts
        </Link>
        <Link
          href={`/result/${keyword}/threads`}
          className={cn(
            "text-gray-200 rounded-full px-4 py-2 hover:bg-gray-300/20",
            isThreads && "text-white bg-gray-300/20"
          )}
        >
          Threads
        </Link>
      </div>
      <div className="">{children}</div>
    </section>
  );
}
