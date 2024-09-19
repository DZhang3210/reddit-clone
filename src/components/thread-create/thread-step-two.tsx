import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface StepTwoProps {
  profileImage: string | null;
  setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
  bannerImage: string | null;
  setBannerImage: React.Dispatch<React.SetStateAction<string | null>>;
  nextStep: React.Dispatch<React.SetStateAction<number>>;
}

export function StepTwo({
  profileImage,
  setProfileImage,
  bannerImage,
  setBannerImage,
  nextStep,
}: StepTwoProps) {
  // const [bannerPreview, setBannerPreview] = useState(null);
  // const [iconPreview, setIconPreview] = useState(null);

  //   const handleFileUpload = (event, type) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         if (type === "banner") {
  //           setBannerPreview(reader.result);
  //           updateFormData({ bannerImage: file });
  //         } else {
  //           setIconPreview(reader.result);
  //           updateFormData({ iconImage: file });
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  return (
    <div className="space-y-4 bg-gray-800 p-5 rounded-xl w-4/5 text-gray-300">
      <div>
        <Label htmlFor="banner">Community Banner</Label>
        <div className="mt-2">
          <Button
            variant="outline"
            // onClick={() => document.getElementById("banner-upload").click()}
          >
            <Upload className="mr-2 h-4 w-4" /> Upload Banner
          </Button>
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            className="hidden"
            // onChange={(e) => handleFileUpload(e, "banner")}
          />
        </div>
        {bannerImage && (
          <img
            src={bannerImage}
            alt="Banner preview"
            className="mt-2 max-h-40 object-cover rounded"
          />
        )}
      </div>
      <div>
        <Label htmlFor="icon">Community Icon</Label>
        <div className="mt-2">
          <Button
            variant="outline"
            // onClick={() => document.getElementById("icon-upload").click()}
          >
            <Upload className="mr-2 h-4 w-4" /> Upload Icon
          </Button>
          <input
            id="icon-upload"
            type="file"
            accept="image/*"
            className="hidden"
            // onChange={(e) => handleFileUpload(e, "icon")}
          />
        </div>
        {profileImage && (
          <img
            src={profileImage}
            alt="Icon preview"
            className="mt-2 w-20 h-20 object-cover rounded-full"
          />
        )}
      </div>
      <div className="w-full flex justify-end gap-2">
        <button
          onClick={() => nextStep((prev) => prev - 1)}
          className="rounded-full bg-black text-white px-4 py-1 hover:text-gray-400 hover:scale-105 transition"
        >
          Back
        </button>
        <button
          onClick={() => nextStep((prev) => prev + 1)}
          className="rounded-full bg-blue-900 text-white px-4 py-1 hover:text-gray-400 hover:scale-105 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
