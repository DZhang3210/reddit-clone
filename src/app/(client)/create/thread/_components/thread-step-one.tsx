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
}

export function StepOne({
  name,
  setName,
  desc,
  setDesc,
  nextStep,
  previewBanner,
  logoImage,
}: StepOneProps) {
  const isFormValid = name && desc;

  const handleNext = () => {
    if (isFormValid) {
      nextStep((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-4 bg-gray-800/80 p-3 sm:p-5 rounded-xl w-full sm:w-4/5 text-gray-300 max-w-4xl ">
      <div className="flex flex-col space-y-4 ">
        {/* Preview section */}
        <div className="w-full ">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <div className="relative">
            <div className="w-full h-32 bg-gray-700 flex items-center justify-center rounded-t-lg">
              {!previewBanner ? (
                <span className="text-gray-500">Banner Image</span>
              ) : (
                <Image
                  src={previewBanner}
                  alt="Banner preview"
                  className="mt-2 object-cover rounded"
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
            <div className="absolute -bottom-4 left-4">
              <div className="w-20 h-20 rounded-full bg-gray-600 border-4 border-gray-800 flex items-center justify-center overflow-hidden">
                {!logoImage ? (
                  <User className="text-gray-500 w-10 h-10" />
                ) : (
                  <Image
                    src={logoImage}
                    alt="Logo preview"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 p-4 bg-gray-900 rounded-b-lg">
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

        <div className="w-full space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Input</h3>
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
      </div>
      <div className="w-full flex justify-end gap-2 mt-4">
        <button
          onClick={() => nextStep((prev) => prev - 1)}
          className="rounded-full bg-black text-white px-4 py-1 hover:text-gray-400 hover:scale-105 transition"
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
        >
          Next
        </button>
      </div>
    </div>
  );
}
