import { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";
import { Id } from "../../../../../../convex/_generated/dataModel";

interface StepTwoProps {
  profileImage: string | null;
  setProfileImage: React.Dispatch<React.SetStateAction<Id<"_storage"> | null>>;
  bannerImage: string | null;
  setBannerImage: React.Dispatch<React.SetStateAction<Id<"_storage"> | null>>;
  nextStep: React.Dispatch<React.SetStateAction<number>>;
  previewBanner: string;
  setPreviewBanner: React.Dispatch<React.SetStateAction<string>>;
  logoImage: string;
  setLogoImage: React.Dispatch<React.SetStateAction<string>>;
}

export function StepTwo({
  profileImage,
  setProfileImage,
  bannerImage,
  setBannerImage,
  nextStep,
  previewBanner,
  setPreviewBanner,
  logoImage,
  setLogoImage,
}: StepTwoProps) {
  const { mutate: generateUploadUrl } = useGenerateUploadUrl();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = useCallback(
    async (
      event: React.ChangeEvent<HTMLInputElement>,
      type: "banner" | "icon"
    ) => {
      const file = event.target.files?.[0];
      if (file) {
        setIsUploading(true);
        try {
          const url = await generateUploadUrl({}, { throwError: true });
          if (!url) throw new Error("Url not found");

          const result = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": file.type },
            body: file,
          });
          const { storageId } = await result.json();

          // Create a temporary URL for preview
          const previewUrl = URL.createObjectURL(file);

          if (type === "banner") {
            setPreviewBanner(previewUrl);
            setBannerImage(storageId);
          } else {
            setLogoImage(previewUrl);
            setProfileImage(storageId);
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setIsUploading(false);
        }
      }
    },
    [
      generateUploadUrl,
      setBannerImage,
      setProfileImage,
      setLogoImage,
      setPreviewBanner,
    ]
  );

  const isNextButtonDisabled = !profileImage || !bannerImage;

  return (
    <div className="space-y-4 bg-gray-800/80 p-3 sm:p-5 rounded-xl w-full  text-gray-300 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
        <div className="w-full sm:w-1/2 space-y-4">
          <div>
            <h3 className="text-lg font-bold mb-4">Input</h3>
            <Label htmlFor="banner">Community Banner</Label>
            <div className="mt-2">
              <Button
                variant="outline"
                onClick={() =>
                  document.getElementById("banner-upload")?.click()
                }
                disabled={isUploading}
                className="w-full sm:w-auto"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload Banner"}
              </Button>
              <input
                id="banner-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "banner")}
              />
            </div>
            {previewBanner && (
              <div className="mt-2 max-h-32 w-full relative aspect-[3/1]">
                <Image
                  src={previewBanner}
                  alt="Banner preview"
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="icon">Community Icon</Label>
            <div className="mt-2">
              <Button
                variant="outline"
                onClick={() => document.getElementById("icon-upload")?.click()}
                disabled={isUploading}
                className="w-full sm:w-auto"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload Icon"}
              </Button>
              <input
                id="icon-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "icon")}
              />
            </div>
            {logoImage && (
              <div className="mt-2 w-20 h-20 relative">
                <Image
                  src={logoImage}
                  alt="Icon preview"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <div className="relative">
            {previewBanner ? (
              <div className="w-full h-32 relative">
                <Image
                  src={previewBanner}
                  alt="Banner preview"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            ) : (
              <div className="w-full h-32 bg-gray-700 flex items-center justify-center rounded-t-lg">
                <span className="text-gray-500">Banner Image</span>
              </div>
            )}
            <div className="absolute -bottom-4 left-4">
              {logoImage ? (
                <div className="w-20 h-20 relative">
                  <Image
                    src={logoImage}
                    alt="Profile preview"
                    fill
                    className="rounded-full border-4 border-gray-800 object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-600 border-4 border-gray-800 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Profile</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 p-4 bg-gray-900 rounded-b-lg">
            <h4 className="text-xl font-bold">Community Name</h4>
            <p className="text-sm text-gray-400 mt-2">r/communityname</p>
            <p className="text-sm text-gray-300 mt-4">
              Welcome to our community! This is where you&apos;ll see a brief
              description of what this community is all about. Join us to
              discuss, share, and connect with like-minded individuals.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end gap-2 mt-4">
        <button
          onClick={() => nextStep((prev) => prev - 1)}
          className="rounded-full bg-black text-white px-4 py-1 hover:text-gray-400 hover:scale-105 transition"
        >
          Back
        </button>
        <button
          onClick={() => nextStep((prev) => prev + 1)}
          disabled={isNextButtonDisabled}
          className={`rounded-full ${
            isNextButtonDisabled
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-900 hover:text-gray-400 hover:scale-105"
          } text-white px-4 py-1 transition`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
