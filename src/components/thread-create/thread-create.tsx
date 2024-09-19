"use client";
import React, { useEffect, useState } from "react";
import { StepOne } from "./thread-step-one";
import { StepTwo } from "./thread-step-two";
import { StepFour } from "./thread-step-four";
import { useRouter } from "next/navigation";

const ThreadCreate = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  useEffect(() => {
    if (step < 0) router.push("/");
  }, [step]);
  return (
    <div className="flex justify-center items-center w-full bg-gray-900">
      {step === 0 && (
        <StepOne
          name={name}
          setName={setName}
          desc={desc}
          setDesc={setDesc}
          nextStep={setStep}
        />
      )}
      {step === 1 && (
        <StepTwo
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          bannerImage={bannerImage}
          setBannerImage={setBannerImage}
          nextStep={setStep}
        />
      )}
      {step === 2 && (
        <StepFour
          name={name}
          desc={desc}
          profileImage={profileImage}
          bannerImage={bannerImage}
          nextStep={setStep}
        />
      )}
    </div>
  );
};

export default ThreadCreate;
