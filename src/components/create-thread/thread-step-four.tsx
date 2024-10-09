import Image from "next/image";

interface StepFourProps {
  name: string | null;
  desc: string | null;
  onSubmit: () => void;
  nextStep: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  previewBanner: string;
  logoImage: string;
  bannerColor: string;
}

export function StepFour({
  name,
  desc,
  nextStep,
  loading,
  onSubmit,
  previewBanner,
  logoImage,
  bannerColor,
}: StepFourProps) {
  return (
    <div className="space-y-4 bg-gray-800/80 p-5 rounded-xl w-full max-w-4xl text-gray-300 pb-20">
      <h3 className="text-lg font-semibold capitalize">
        This is what your thread will look like
      </h3>

      <div className="w-full">
        <div className="relative">
          {previewBanner ? (
            <Image
              src={previewBanner}
              alt="Banner preview"
              width={800}
              height={128}
              className="w-full h-32 object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-32 bg-gray-700 flex items-center justify-center rounded-t-lg">
              <span className="text-gray-500">Banner Image</span>
            </div>
          )}
          <div className="absolute -bottom-4 left-4">
            {logoImage ? (
              <Image
                src={logoImage}
                alt="Profile preview"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full border-4 border-gray-800 object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-600 border-4 border-gray-800 flex items-center justify-center">
                <span className="text-gray-500 text-xs">Profile</span>
              </div>
            )}
          </div>
        </div>
        <div
          className="mt-8 p-4 bg-gray-900 rounded-b-lg"
          style={{ backgroundColor: bannerColor }}
        >
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
          disabled={loading}
        >
          Back
        </button>
        <button
          onClick={() => onSubmit()}
          className="rounded-full bg-blue-900 text-white px-4 py-1 hover:text-gray-400 hover:scale-105 transition"
          disabled={loading}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
