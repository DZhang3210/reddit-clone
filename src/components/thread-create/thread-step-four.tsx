import { Button } from "../ui/button";

interface StepFourProps {
  name: string | null;
  desc: string | null;
  profileImage: string | null;
  bannerImage: string | null;
  nextStep: React.Dispatch<React.SetStateAction<number>>;
}

export function StepFour({
  name,
  desc,
  profileImage,
  bannerImage,
  nextStep,
}: StepFourProps) {
  // if (
  //   name === null ||
  //   desc === null ||
  //   profileImage === null ||
  //   bannerImage === null
  // )
  //   return null;

  return (
    <div className="space-y-4 bg-gray-800 p-5 rounded-xl w-4/5 text-gray-300">
      <h3 className="text-lg font-semibold">Confirm Community Details</h3>
      <div>
        <strong>Name:</strong> {name}
      </div>
      <div>
        <strong>Description:</strong> {desc}
      </div>
      <div>
        <strong>Banner:</strong> {bannerImage ? "Uploaded" : "Not uploaded"}
      </div>
      <div>
        <strong>Icon:</strong> {profileImage ? "Uploaded" : "Not uploaded"}
      </div>
      {/* <div>
        <strong>Tags:</strong> {formData.tags.join(", ")}
      </div> */}
      <div className="w-full flex justify-end gap-2">
        <button
          onClick={() => nextStep((prev) => prev - 1)}
          className="rounded-full bg-black text-white px-4 py-1 hover:text-gray-400 hover:scale-105 transition"
        >
          Back
        </button>
        <button
          onClick={() => {}}
          className="rounded-full bg-blue-900 text-white px-4 py-1 hover:text-gray-400 hover:scale-105 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
