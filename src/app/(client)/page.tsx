"use client";
import UserButton from "@/features/auth/components/user-button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/posts");
  }, []);
  return <div>Main Page</div>;
}
