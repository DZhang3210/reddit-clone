"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGithub, FaRedditAlien } from "react-icons/fa";
import { SignInFlow } from "./types";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

const SignUpCard: React.FC<SignUpCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const handleProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#181C1F] overflow-y-auto">
      <div className="w-full h-full p-4 bg-[#181C1F] text-white border-none rounded-none max-w-[550px]">
        <div className="flex items-center gap-x-2 text-blue-600">
          <FaRedditAlien className="size-8" />
          <span className="text-2xl translate-y-[10%]">blueit</span>
        </div>
        <div className="px-0 pt-0 mt-5">
          <div className="text-2xl">Sign up to Continue</div>
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
          <form className="space-y-4" onSubmit={onPasswordSignUp}>
            <Input
              disabled={pending}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              type="name"
              className="text-base h-12 rounded-none placeholder:text-gray-400 border-gray-400 focus:border-white focus:ring-0 transition-colors placeholder:text-base"
              required
            />
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
            <Input
              disabled={pending}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              type="password"
              className="text-base h-12 rounded-none placeholder:text-gray-400 border-gray-400 focus:border-white focus:ring-0 transition-colors placeholder:text-base"
              required
              aria-label="confirm password"
            />
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-400 text-lg h-12"
              size="lg"
              disabled={pending}
              aria-label="continue button"
            >
              Sign Up
            </Button>
          </form>

          <div className="flex items-center justify-center text-gray-400 text-base">
            OR
          </div>
          <div className="flex flex-col gap-y-2.5">
            <Button
              disabled={pending}
              onClick={() => handleProviderSignUp("google")}
              variant="outline"
              size="lg"
              className="w-full relative text-lg h-12 bg-white text-black hover:bg-gray-300 gap-3 items-center"
              aria-label="google button"
            >
              <FcGoogle />{" "}
              <div className="flex items-center gap-x-1">
                <span className="hidden md:block">Continue with</span>
                <span>Google</span>
              </div>
            </Button>
            <Button
              disabled={pending}
              onClick={() => handleProviderSignUp("github")}
              variant="outline"
              size="lg"
              className="w-full relative text-lg h-12 bg-white text-black hover:bg-gray-300 gap-3 items-center"
              aria-label="github button"
            >
              <FaGithub />{" "}
              <div className="flex items-center gap-x-1">
                <span className="hidden md:block">Continue with</span>
                <span>Github</span>
              </div>
            </Button>
          </div>
          <p className="text-base text-gray-300">
            Already have an account?{" "}
            <span
              className="text-sky-600 hover:underline cursor-pointer"
              onClick={() => setState("signIn")}
              aria-label="sign in button"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpCard;
