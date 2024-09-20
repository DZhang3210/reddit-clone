import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileText, Image, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";
import { useGetAllThreads } from "@/features/threads/api/use-get-all";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RedditCreatePost() {
  const router = useRouter();
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { mutate: generateUploadUrl } = useGenerateUploadUrl();
  const [activeTab, setActiveTab] = useState("text");
  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);
  const { data: threads, isLoading: threadsLoading } = useGetAllThreads();
  const communities = threads?.map((thread) => {
    return {
      id: thread?._id,
      label: `/${thread?.title}`,
    };
  });

  const handleSubmit = (type: "text" | "image") => {
    const postData = {
      community: selectedCommunity,
      type,
      title: type === "text" ? title : imageTitle,
      content: type === "text" ? textContent : imageUrl,
    };
    console.log("Submitting post:", postData);
    // Here you would typically send this data to your backend
  };

  const handleFileUpload = useCallback(
    async (file: File) => {
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
          setImageUrl(previewUrl);
          setImageFile(file);
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setIsUploading(false);
        }
      }
    },
    [generateUploadUrl]
  );
  const handleImageDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload]
  );

  const handleRemoveImage = () => {
    setImageUrl(null);
    setImageFile(null);
  };

  const isPostButtonDisabled = () => {
    if (!selectedCommunity) return true;
    if (activeTab === "text") {
      return !title.trim() || !textContent.trim();
    } else if (activeTab === "image") {
      return !imageTitle.trim() || !imageUrl;
    }
    return true;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-800 text-white mt-10">
      <CardContent className="p-6">
        <CardHeader className="text-2xl font-semibold">
          Create Your Amazing Post
        </CardHeader>
        <Select onValueChange={setSelectedCommunity}>
          <SelectTrigger className="w-full mb-4 bg-gray-700 text-white border-gray-600">
            <SelectValue placeholder="Choose a community" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-white border-gray-600">
            {communities &&
              communities.map((community) => (
                <SelectItem key={community.label} value={community.label}>
                  {community.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-700">
            <TabsTrigger
              value="text"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <FileText className={cn("w-4 h-4 mr-2")} />
              Text
            </TabsTrigger>
            <TabsTrigger
              value="image"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Image className="w-4 h-4 mr-2" />
              Image
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text" className="mt-0 space-y-4 w-full">
            <div>
              <Label htmlFor="title" className="text-white">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter your post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="text-content" className="text-white">
                Text
              </Label>
              <Textarea
                id="text-content"
                placeholder="Enter your post content"
                className="min-h-[200px] w-full bg-gray-700 text-white border-gray-600"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
              />
            </div>
          </TabsContent>
          <TabsContent value="image" className="mt-0 space-y-4 w-full">
            <div>
              <Label htmlFor="image-title" className="text-white">
                Title
              </Label>
              <Input
                id="image-title"
                placeholder="Enter your image title"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>
            <div
              className="border-2 border-dashed border-gray-600 rounded-md p-4 text-center cursor-pointer min-h-[200px] w-full flex flex-col items-center justify-center bg-gray-700 text-white relative"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageDrop}
            >
              {imageUrl ? (
                <div className="w-full h-full relative">
                  <img
                    src={imageUrl}
                    alt="post image"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-gray-800 rounded-full p-5 hover:bg-gray-700"
                  >
                    <X className=" text-white" size={40} />
                  </button>
                </div>
              ) : (
                <Image className="w-12 h-12 mb-4 text-gray-400" />
              )}
              <p>
                {imageFile
                  ? imageFile.name
                  : "Drag and drop your image here, or click to select"}
              </p>
              <Button
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                disabled={isUploading}
                className="mt-4"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload Image"}
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-800">
        <Button
          variant="outline"
          className="border-gray-600 text-white hover:bg-gray-700"
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleSubmit(activeTab === "text" ? "text" : "image")}
          className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPostButtonDisabled()}
        >
          Post
        </Button>
      </CardFooter>
    </Card>
  );
}
