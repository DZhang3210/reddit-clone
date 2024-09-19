import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { User } from "lucide-react";

interface StepOneProps {
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  desc: string | null;
  setDesc: React.Dispatch<React.SetStateAction<string | null>>;
  nextStep: React.Dispatch<React.SetStateAction<number>>;
}

export function StepOne({
  name,
  setName,
  desc,
  setDesc,
  nextStep,
}: StepOneProps) {
  const [errors, setErrors] = useState({ name: "", desc: "" });

  const validateAndProceed = () => {
    const newErrors = { name: "", desc: "" };
    if (!name) newErrors.name = "Community name is required";
    if (!desc) newErrors.desc = "Community description is required";

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.desc) {
      nextStep((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-4 bg-gray-800 p-3 sm:p-5 rounded-xl w-full sm:w-4/5 text-gray-300 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
        <div className="w-full sm:w-1/2 space-y-4">
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
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
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
            {errors.desc && (
              <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
            )}
          </div>
        </div>

        {/* Preview section */}
        <div className="w-full sm:w-1/2">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <div className="relative">
            <div className="w-full h-32 bg-gray-700 flex items-center justify-center rounded-t-lg">
              <span className="text-gray-500">Banner Image</span>
            </div>
            <div className="absolute -bottom-4 left-4">
              <div className="w-20 h-20 rounded-full bg-gray-600 border-4 border-gray-800 flex items-center justify-center">
                <User className="text-gray-500 w-10 h-10" />
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
      </div>
      <div className="w-full flex justify-end gap-2 mt-4">
        <button
          onClick={() => nextStep((prev) => prev - 1)}
          className="rounded-full bg-black text-white px-4 py-1 hover:text-gray-400 hover:scale-105 transition"
        >
          Back
        </button>
        <button
          onClick={validateAndProceed}
          className="rounded-full bg-blue-900 text-white px-4 py-1 hover:text-gray-400 hover:scale-105 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
