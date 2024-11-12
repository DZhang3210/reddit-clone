"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGithub, FaRedditAlien } from "react-icons/fa";
import { SignInFlow } from "./types";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

const SignInCard: React.FC<SignInCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => {
        setError("Invalid email or password");
      })
      .finally(() => {
        setPending(false);
      });
  };
  const handleProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#181C1F]">
      <div className="w-full h-full p-12 bg-[#181C1F] text-white border-none rounded-none max-w-[550px]">
        <div className="flex items-center gap-x-2 text-orange-600">
          <FaRedditAlien className="size-8" />
          <span className="text-2xl translate-y-[10%]">reddit</span>
        </div>
        <div className="space-y-2 mt-5">
          <div className="text-2xl">Login to Continue</div>
          <div className="text-gray-400 text-base">
            Use your email or another serve to continue
          </div>
        </div>
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert className="size-4" />
            <p>{error} </p>
          </div>
        )}
        <div className="space-y-5 px-0 pb-0 pt-10">
          <form className="space-y-2.5 " onSubmit={onPasswordSignIn}>
            <Input
              disabled={pending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="text-base h-12 rounded-none placeholder:text-gray-400 border-gray-400 focus:border-white focus:ring-0 transition-colors placeholder:text-base"
              required
            />

            <Input
              disabled={pending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="text-base h-12 rounded-none placeholder:text-gray-400 border-gray-400 focus:border-white focus:ring-0 transition-colors placeholder:text-base"
              required
            />
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-400 text-lg h-12"
              size="lg"
              disabled={pending}
              aria-label="submit button"
            >
              Log In
            </Button>
          </form>
          <div className="flex items-center justify-center text-gray-400 text-base">
            OR
          </div>
          <div className="flex flex-col gap-y-2.5">
            <Button
              disabled={pending}
              onClick={() => handleProviderSignIn("google")}
              variant="outline"
              size="lg"
              className="w-full relative text-lg h-12 bg-white text-black hover:bg-gray-300 gap-3 items-center"
              aria-label="google button"
            >
              <FcGoogle />
              Continue with Google
            </Button>
            <Button
              disabled={pending}
              onClick={() => handleProviderSignIn("github")}
              variant="outline"
              size="lg"
              className="w-full relative text-lg h-12 bg-white text-black hover:bg-gray-300 gap-3 items-center"
              aria-label="github button"
            >
              <FaGithub />
              Continue with Github
            </Button>
          </div>
          <p className="text-base text-gray-300">
            Don&apos;t have an account?{" "}
            <span
              className="text-sky-600 hover:underline cursor-pointer"
              onClick={() => setState("signUp")}
              aria-label="sign up button"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInCard;
