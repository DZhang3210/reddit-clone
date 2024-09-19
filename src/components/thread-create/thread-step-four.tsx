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
  return (
    <div className="space-y-4 bg-gray-800 p-5 rounded-xl w-4/5 text-gray-300 min-h-screen">
      <h3 className="text-lg font-semibold">Confirm Community Details</h3>

      <div className="w-full">
        <div className="relative">
          {bannerImage ? (
            <img
              src={bannerImage}
              alt="Banner preview"
              className="w-full h-32 object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-32 bg-gray-700 flex items-center justify-center rounded-t-lg">
              <span className="text-gray-500">Banner Image</span>
            </div>
          )}
          <div className="absolute -bottom-4 left-4">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile preview"
                className="w-20 h-20 rounded-full border-4 border-gray-800 object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-600 border-4 border-gray-800 flex items-center justify-center">
                <span className="text-gray-500 text-xs">Profile</span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 p-4 bg-gray-900 rounded-b-lg">
          <h4 className="text-xl font-bold">{name || "Community Name"}</h4>
          <p className="text-sm text-gray-400 mt-2">
            r/{name?.toLowerCase().replace(/\s+/g, "") || "communityname"}
          </p>
          <p className="text-sm text-gray-300 mt-4">
            {desc ||
              "Welcome to our community! This is where you'll see a brief description of what this community is all about. Join us to discuss, share, and connect with like-minded individuals."}
          </p>
        </div>
      </div>

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
