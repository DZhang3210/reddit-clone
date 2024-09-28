"use client";
import React, { useEffect, useState } from "react";
import { StepOne } from "./thread-step-one";
import { StepTwo } from "./thread-step-two";
import { StepFour } from "./thread-step-four";
import { useCreateThread } from "@/features/threads/api/use-create-thread";
import { toast } from "sonner";
import { Id } from "../../../../../../convex/_generated/dataModel";
import useToggleThread from "@/hooks/create-thread-hook";

const ThreadCreate = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [previewBanner, setPreviewBanner] = useState("");
  const [logoImage, setLogoImage] = useState("");
  const [profileImage, setProfileImage] = useState<Id<"_storage"> | null>(null);
  const [bannerImage, setBannerImage] = useState<Id<"_storage"> | null>(null);
  const { mutate: createThread, isPending: creatingThread } = useCreateThread();
  const toggleThread = useToggleThread();
  useEffect(() => {
    if (step < 0) toggleThread.setOff();
  }, [step, toggleThread]);

  const onSubmit = () => {
    if (!name || !desc || !profileImage || !bannerImage) {
      toast.error("you to fill in all fields..");
      return;
    }
    createThread(
      {
        title: name,
        description: desc,
        logoImage: profileImage,
        bannerImage,
      },
      {
        onSuccess: () => {
          toast.success("Thread Created");
          toggleThread.setOff();
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center w-full">
      {step === 0 && (
        <StepOne
          name={name}
          setName={setName}
          desc={desc}
          setDesc={setDesc}
          nextStep={setStep}
          previewBanner={previewBanner}
          logoImage={logoImage}
        />
      )}
      {step === 1 && (
        <StepTwo
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          bannerImage={bannerImage}
          setBannerImage={setBannerImage}
          nextStep={setStep}
          previewBanner={previewBanner}
          setPreviewBanner={setPreviewBanner}
          logoImage={logoImage}
          setLogoImage={setLogoImage}
        />
      )}
      {step === 2 && (
        <StepFour
          name={name}
          desc={desc}
          nextStep={setStep}
          onSubmit={onSubmit}
          loading={creatingThread}
          previewBanner={previewBanner}
          logoImage={logoImage}
        />
      )}
    </div>
  );
};

export default ThreadCreate;
