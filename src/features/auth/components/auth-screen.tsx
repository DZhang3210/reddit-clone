"use client";
import React, { useState } from "react";
import { SignInFlow } from "./types";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";
import Image from "next/image";

const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");
  return (
    <div className="h-screen w-full grid grid-cols-2 overflow-y-auto">
      <div className="md:h-auto col-span-2 lg:col-span-1">
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
      <div className="relative flex-1 overflow-hidden hidden lg:block">
        <Image
          src="/login-background.jpg"
          alt="logo"
          width={1920}
          height={1080}
          className="absolute inset-0 object-cover w-full h-full"
          priority
        />
      </div>
    </div>
  );
};

export default AuthScreen;
