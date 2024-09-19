import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { FileText, Image, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";

const communities = [
  { value: "AskReddit", label: "r/AskReddit" },
  { value: "funny", label: "r/funny" },
  { value: "gaming", label: "r/gaming" },
  { value: "aww", label: "r/aww" },
  { value: "pics", label: "r/pics" },
];

export default function RedditCreatePost() {
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

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-800 text-white">
      <CardContent className="p-6">
        <Select onValueChange={setSelectedCommunity}>
          <SelectTrigger className="w-full mb-4 bg-gray-700 text-white border-gray-600">
            <SelectValue placeholder="Choose a community" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-white border-gray-600">
            {communities.map((community) => (
              <SelectItem key={community.value} value={community.value}>
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
              className="border-2 border-dashed border-gray-600 rounded-md p-4 text-center cursor-pointer min-h-[200px] w-full flex flex-col items-center justify-center bg-gray-700 text-white"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageDrop}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded preview"
                  className="max-h-48 object-contain mb-4"
                />
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
          onClick={() => handleSubmit(title ? "text" : "image")}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Post
        </Button>
      </CardFooter>
    </Card>
  );
}
