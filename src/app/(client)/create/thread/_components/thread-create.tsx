"use client";
import React, { useEffect, useState } from "react";
import { StepOne } from "./thread-step-one";
import { StepTwo } from "./thread-step-two";
import { StepFour } from "./thread-step-four";
import { useCreateThread } from "@/features/threads/api/use-create-thread";
import { toast } from "sonner";
import { Id } from "../../../../../../convex/_generated/dataModel";
import useToggleThread from "@/hooks/create-thread-hook";
import { useUpdateThread } from "@/features/threads/api/use-update-thread";

const ThreadCreate = () => {
  const toggleThread = useToggleThread();
  const [step, setStep] = useState(0);
  const [name, setName] = useState<string | null>(toggleThread.title);
  const [desc, setDesc] = useState<string | null>(toggleThread.description);
  const [previewBanner, setPreviewBanner] = useState(toggleThread.bannerImage);
  const [logoImage, setLogoImage] = useState(toggleThread.logoImage);
  const [profileImage, setProfileImage] = useState<Id<"_storage"> | null>(null);
  const [bannerImage, setBannerImage] = useState<Id<"_storage"> | null>(null);
  const [bannerColor, setBannerColor] = useState<string>(
    toggleThread.bannerColor || "#000000"
  );
  const { mutate: createThread, isPending: creatingThread } = useCreateThread();
  const { mutate: updateThread } = useUpdateThread();
  useEffect(() => {
    if (step < 0) toggleThread.setOff();
  }, [step]);

  const onSubmit = () => {
    if (
      !name ||
      !desc ||
      (!toggleThread.editMode && (!profileImage || !bannerImage))
    ) {
      toast.error("you need to fill in all fields..");
      console.log(profileImage, bannerImage, toggleThread.editMode);
      return;
    }
    if (toggleThread.editMode && toggleThread.id) {
      updateThread(
        {
          id: toggleThread.id as Id<"threads">,
          title: name,
          description: desc,
          logoImage: profileImage,
          bannerImage: bannerImage,
          bannerColor,
        },
        {
          onSuccess: () => {
            toast.success("Thread Updated");
            toggleThread.setOff();
          },
          onError: () => {
            toast.error("Something went wrong");
          },
        }
      );
    } else {
      createThread(
        {
          title: name,
          description: desc,
          logoImage: profileImage as Id<"_storage">,
          bannerImage: bannerImage as Id<"_storage">,
          bannerColor,
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
    }
  };
  return (
    <div className="flex justify-center items-center w-full py-5 overflow-auto">
      {step === 0 && (
        <StepOne
          name={name}
          setName={setName}
          desc={desc}
          setDesc={setDesc}
          nextStep={setStep}
          previewBanner={previewBanner}
          logoImage={logoImage}
          bannerColor={bannerColor}
        />
      )}
      {step === 1 && (
        <StepTwo
          setProfileImage={setProfileImage}
          setBannerImage={setBannerImage}
          nextStep={setStep}
          previewBanner={previewBanner}
          setPreviewBanner={setPreviewBanner}
          logoImage={logoImage}
          setLogoImage={setLogoImage}
          bannerColor={bannerColor}
          setBannerColor={setBannerColor}
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
          bannerColor={bannerColor}
        />
      )}
    </div>
  );
};

export default ThreadCreate;
