import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

interface StepOneProps {
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  desc: string | null;
  setDesc: React.Dispatch<React.SetStateAction<string | null>>;
  nextStep: React.Dispatch<React.SetStateAction<number>>;
  previewBanner: string;
  logoImage: string;
  bannerColor: string;
}

export function StepOne({
  name,
  setName,
  desc,
  setDesc,
  nextStep,
  previewBanner,
  logoImage,
  bannerColor,
}: StepOneProps) {
  const isFormValid = name && desc;

  const handleNext = () => {
    if (isFormValid) {
      nextStep((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-4 bg-transparent p-3 sm:p-5 rounded-xl w-full h-full  text-gray-300 max-w-4xl overflow-y-auto pb-20">
      <div>
        <h1 className="text-2xl font-bold">Tell us about your community</h1>
        <p className="text-sm text-gray-400">
          A name and description help people understand what your community is
          all about.
        </p>
      </div>
      <div className="flex space-y-4 gap-10 flex-col md:flex-row">
        {/* Preview section */}

        <div className="w-full space-y-4 order-2 md:order-1">
          <div>
            <Label htmlFor="name">Community Name</Label>
            <Input
              id="name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 rounded-xl bg-gray-600 outline-none border-transparent"
              placeholder="Enter community name"
            />
          </div>
          <div>
            <Label htmlFor="description">Community Description</Label>
            <Textarea
              id="description"
              value={desc || ""}
              onChange={(e) => setDesc(e.target.value)}
              className="mt-2 rounded-xl bg-gray-600 outline-none border-transparent"
              placeholder="Describe your community"
            />
          </div>
        </div>
        <div className="w-full order-1 md:order-2">
          <div className="relative ">
            <div className="w-full h-32 bg-gray-700 rounded-t-lg relative overflow-hidden">
              {!previewBanner ? (
                <span className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Banner Image
                </span>
              ) : (
                <Image
                  src={previewBanner}
                  alt="Banner preview"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              )}
            </div>
            <div className="absolute -bottom-4 left-4">
              <div className="w-20 h-20 rounded-full bg-gray-600 border-4 border-gray-800 overflow-hidden relative">
                {!logoImage ? (
                  <User className="absolute inset-0 m-auto text-gray-500 w-10 h-10" />
                ) : (
                  <Image
                    src={logoImage}
                    alt="Logo preview"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className="mt-8 p-4 bg-gray-900 rounded-b-lg"
            style={{ backgroundColor: bannerColor }}
          >
            <h4 className="text-xl font-bold">{name || "Community Name"}</h4>
            <p className="text-sm text-gray-400 mt-2">
              r/
              {name ? name.toLowerCase().replace(/\s+/g, "") : "communityname"}
            </p>
            <p className="text-sm text-gray-300 mt-4">
              {desc || "Community description will appear here."}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end gap-2 my-4">
        <button
          onClick={() => nextStep((prev) => prev - 1)}
          className="rounded-full bg-black text-white px-4 py-1 hover:text-gray-400 hover:scale-105 transition"
          aria-label="back-trigger"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className={`rounded-full px-4 py-1 transition ${
            isFormValid
              ? "bg-blue-900 text-white hover:text-gray-400 hover:scale-105"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          aria-label="next-trigger"
        >
          Next
        </button>
      </div>
    </div>
  );
}
