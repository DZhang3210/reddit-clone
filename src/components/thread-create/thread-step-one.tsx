import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

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
  return (
    <div className="space-y-4 bg-gray-800 p-5 rounded-xl w-4/5 text-gray-300">
      <div>
        <Label htmlFor="name">Community Name</Label>
        <Input
          id="name"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl bg-gray-600 outline-none border-transparent"
          placeholder="Enter community name"
        />
      </div>
      <div>
        <Label htmlFor="description">Community Description</Label>
        <Textarea
          id="description"
          value={desc || ""}
          onChange={(e) => setDesc(e.target.value)}
          className="rounded-xl bg-gray-600 outline-none border-transparent"
          placeholder="Describe your community"
        />
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
